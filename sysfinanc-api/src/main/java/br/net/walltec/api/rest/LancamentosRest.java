/**
 * 
 */
package br.net.walltec.api.rest;

import java.util.Base64;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.inject.Inject;
import javax.interceptor.Interceptors;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import br.net.walltec.api.dto.FiltraParcelasDto;
import br.net.walltec.api.dto.GeracaoParcelasDto;
import br.net.walltec.api.dto.GravacaoArquivoDto;
import br.net.walltec.api.dto.RegistroExtratoDto;
import br.net.walltec.api.dto.ResumoDetalhadoMesAnoDTO;
import br.net.walltec.api.dto.ResumoMesAnoDTO;
import br.net.walltec.api.dto.UtilizacaoParcelasDto;
import br.net.walltec.api.excecoes.NegocioException;
import br.net.walltec.api.excecoes.WalltecException;
import br.net.walltec.api.excecoes.WebServiceException;
import br.net.walltec.api.importacao.estrategia.ImportadorArquivo;
import br.net.walltec.api.importacao.estrategia.ImportadorBB;
import br.net.walltec.api.negocio.servicos.LancamentoServico;
import br.net.walltec.api.negocio.servicos.comum.CrudPadraoServico;
import br.net.walltec.api.rest.comum.RequisicaoRestPadrao;
import br.net.walltec.api.rest.dto.BaixaLancamentoDTO;
import br.net.walltec.api.rest.interceptors.RequisicaoInterceptor;
import br.net.walltec.api.utilitarios.UtilData;
import br.net.walltec.api.utilitarios.UtilFormatador;
import br.net.walltec.api.vo.LancamentoVO;
import br.net.walltec.api.vo.UtilizacaoLancamentoVO;


/**
 * @author Administrador
 * 
 */

//TODO: atualizar as urls para n?o ter infinitivo e sim substantivos.
//TODO: Seguir a seguinte padroniza??o: PUT - atualiza; POST - cria;
@Path("/lancamentos")
@Produces(value=MediaType.APPLICATION_JSON)
@Interceptors({RequisicaoInterceptor.class})

public class LancamentosRest extends RequisicaoRestPadrao<LancamentoVO> {

	private static Map<String, ImportadorArquivo> mapImportadores = new HashMap<String, ImportadorArquivo>();
	
	static {
		mapImportadores.put("001", new ImportadorBB());
	}
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	@Inject
	private LancamentoServico servico;


	@POST
    @Path(value="/buscarLancamentos")
	public Response buscarLancamentos(FiltraParcelasDto dto){
        try {
            return Response.ok(servico.listarParcelas(dto)).build();
        } catch (NegocioException e) {
            throw new WebServiceException(e.getMessage());
        } catch(Exception e){
            e.printStackTrace();
            throw new WebServiceException(e.getMessage());
        }
	}	

	@POST
	@Path(value="/baixar")
	@Consumes(MediaType.APPLICATION_JSON)
	public Response baixarLancamento(BaixaLancamentoDTO dto){
        try {
            servico.baixarParcelas(dto.getListaIdsLancamentos());
            return Response.accepted().build();
        } catch (NegocioException e) {
            throw new WebServiceException(e.getMessage());
        }
    }
	
	@POST
	@Path(value="/utilizar")
	public Response utilizarLancamento(UtilizacaoParcelasDto dto){
        try {
            return Response.ok(servico.utilizarLancamento(dto)).build();
        } catch (NegocioException e) {
            throw new WebServiceException(e.getMessage());
        }
		
	}	

	@GET
	@Path(value="/listarHistoricoUso")
	public Response listarHistoricoUsos(@QueryParam("idLancamento") Integer idLancamento){
        try {
            List<UtilizacaoLancamentoVO> listarHistoricoUso = servico.listarHistoricoUso(idLancamento);
			return Response.ok(listarHistoricoUso).build();
        } catch (NegocioException e) {
            throw new WebServiceException(e.getMessage());
        }
    }


	@Override
	public CrudPadraoServico<?, ?> getServico() {
		return servico;
	}

	@Override
	public Response incluir(LancamentoVO objeto) throws WebServiceException {
        try {
        	Date dataFim = objeto.getDataFimStr() != null && !objeto.getDataFimStr().isEmpty() ? UtilData.getData(objeto.getDataFimStr(), UtilData.SEPARADOR_PADRAO) : null;
        	Date dataVencimento = UtilData.getData(objeto.getDataVencimentoStr(), UtilData.SEPARADOR_PADRAO);
        	
        	if (dataFim != null && dataFim.before(dataVencimento)) {
        		throw new WebServiceException("Data Fim não deve ser menor do que a data de Vencimento!");
        	}	
        	
            objeto = servico.incluirVO(objeto);
            
            if (dataFim != null) {
            	this.gerarLancamentos(objeto, dataVencimento, dataFim);
            }
            
            return Response.ok(objeto).build();
        } catch (NegocioException e) {
            throw new WebServiceException(e.getMessage());
        } catch(Exception e){
            e.printStackTrace();
            throw new WebServiceException(e.getMessage());
        }
	}

	/**
	 * @param objeto
	 */
	private void gerarLancamentos(LancamentoVO objeto, Date dataVencimento, Date dataFim) throws NegocioException {
		int qtd = UtilData.getDiasDiferenca(dataVencimento, dataFim) / 30;
		
    	GeracaoParcelasDto dto = new GeracaoParcelasDto();
    	dto.setDataVencimentoStr(objeto.getDataVencimentoStr());
    	dto.setIdConta(objeto.getIdConta());
    	dto.setQuantidade(qtd);
    	dto.setValorVencimento(objeto.isDespesa() ? UtilFormatador.formatarStringComoValor(objeto.getValorDebitoStr()) :
    												UtilFormatador.formatarStringComoValor(objeto.getValorCreditoStr()));
    	dto.setIdParcelaOrigem(objeto.getIdParcelaOrigem());
    	dto.setParcial(false);
    	dto.setIdUsuario(1);
    	dto.setDescricaoParcela(objeto.getDescricao());
    	dto.setNumLancOrigem(objeto.getNumero());
    	dto.setDespesa(objeto.isDespesa());
		this.servico.gerarLancamentos(dto);
	}

	@Override
	public Response alterar(LancamentoVO objeto) throws WebServiceException {
        try {
            return Response.ok(servico.alterarVO(objeto)).build();
        } catch (NegocioException e) {
            throw new WebServiceException(e.getMessage());
        } catch(Exception e){
            e.printStackTrace();
            throw new WebServiceException(e.getMessage());
        }
	}

	@Override
	public Response excluir(Integer idChaveObjeto) throws WebServiceException {
        try {
            servico.excluir(idChaveObjeto);
            return Response.ok().build();
        } catch (NegocioException e) {
            throw new WebServiceException(e.getMessage());
        } catch(Exception e){
            e.printStackTrace();
            throw new WebServiceException(e.getMessage());
        }
	}
	
	@POST
	@Path("/gravar-arquivo")
	public Response gravarArquivo(GravacaoArquivoDto dto) throws WebServiceException {
		byte[] conteudoArquivoDesformatado = Base64.getDecoder().decode(dto.getArquivoBase64());
		List<RegistroExtratoDto> dadosArquivo;
		try {
			dadosArquivo = mapImportadores.get("001").importar("arquivo", conteudoArquivoDesformatado);
			return Response.ok(dadosArquivo).build();
		} catch (WalltecException e) {
			e.printStackTrace();
            throw new WebServiceException(e.getMessage());
		}
	}
	
	/* (non-Javadoc)
	 * @see br.net.walltec.api.rest.RequisicaoRestPadrao#listar()
	 */
	@Override
	public Response listar(@QueryParam(value="page") Integer pagina) throws WebServiceException {
		return Response.noContent().build();
	}
	
	@GET
	@Path("/obter-dashboard")
	public Response gerarDashboards() throws WebServiceException {
		try {
			return Response.ok().entity(servico.montarDashboards(2, 2018)).build();
		} catch (NegocioException e) {
			e.printStackTrace();
            throw new WebServiceException(e.getMessage());
		}
	}

	@POST
	@Path("/gerar-lancamento")
	public Response gerarLancamentos(GeracaoParcelasDto dto) throws WebServiceException {
		try {
			
			if (dto.getParcial()) {
				return Response.ok().entity(this.servico.montarListaLancamentosVO(dto)).build();
			} 
			this.servico.gerarLancamentos(dto);
		} catch (NegocioException e) {
			e.printStackTrace();
            throw new WebServiceException(e.getMessage());
		}
		return Response.ok().build();
	}
	
	@GET
	@Path("/obter-resumo-mes/{mes}/{ano}")
	public Response gerarResumoMes(@PathParam("mes") Integer mes, @PathParam("ano") Integer ano) throws WebServiceException {
		
		FiltraParcelasDto dtoFiltro = new FiltraParcelasDto();
		dtoFiltro.setMes(mes);
		dtoFiltro.setAno(ano);
		
		try {
			ResumoMesAnoDTO retorno = servico.obterResumoMesAno(dtoFiltro);
			return Response.ok().entity(retorno).build();
		} catch (NegocioException e) {
			e.printStackTrace();
            throw new WebServiceException(e.getMessage());
		}
	}
	
	@GET
	@Path("/obter-resumo-mes-detalhe/{mes}/{ano}")
	public Response gerarResumoMesDetalhado(@PathParam("mes") Integer mes, @PathParam("ano") Integer ano) throws WebServiceException {
		
		FiltraParcelasDto dtoFiltro = new FiltraParcelasDto();
		dtoFiltro.setMes(mes);
		dtoFiltro.setAno(ano);
		
		try {
			ResumoDetalhadoMesAnoDTO retorno = servico.obterResumoDetalhadoMesAno(dtoFiltro);
			return Response.ok().entity(retorno).build();
		} catch (NegocioException e) {
			e.printStackTrace();
            throw new WebServiceException(e.getMessage());
		}
	}	

}


