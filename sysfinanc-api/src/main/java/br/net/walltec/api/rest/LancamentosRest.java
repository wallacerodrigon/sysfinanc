/**
 * 
 */
package br.net.walltec.api.rest;

import java.util.Base64;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import javax.inject.Inject;
import javax.interceptor.Interceptors;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.Status;

import br.net.walltec.api.conversores.FabricaConversores;
import br.net.walltec.api.dto.ConsultaLancamentosDTO;
import br.net.walltec.api.dto.FiltraParcelasDto;
import br.net.walltec.api.dto.GeracaoParcelasDto;
import br.net.walltec.api.dto.GravacaoArquivoDto;
import br.net.walltec.api.dto.LancamentosPorRubricaDTO;
import br.net.walltec.api.dto.MapaDashboardDTO;
import br.net.walltec.api.dto.RegistroExtratoDto;
import br.net.walltec.api.dto.ResumoMesAnoDTO;
import br.net.walltec.api.dto.RetornoArquivoDTO;
import br.net.walltec.api.dto.UtilizacaoParcelasDto;
import br.net.walltec.api.entidades.Lancamento;
import br.net.walltec.api.excecoes.NegocioException;
import br.net.walltec.api.excecoes.TotalConciliadoInvalidoException;
import br.net.walltec.api.excecoes.WalltecException;
import br.net.walltec.api.excecoes.WebServiceException;
import br.net.walltec.api.importacao.estrategia.ImportadorArquivo;
import br.net.walltec.api.importacao.estrategia.ImportadorBB;
import br.net.walltec.api.negocio.servicos.LancamentoServico;
import br.net.walltec.api.negocio.servicos.comum.CrudPadraoServico;
import br.net.walltec.api.rest.comum.RequisicaoRestPadrao;
import br.net.walltec.api.rest.dto.BaixaLancamentoDTO;
import br.net.walltec.api.rest.dto.filtro.DesfazimentoConciliacaoDTO;
import br.net.walltec.api.rest.dto.filtro.RegistroFechamentoMesDTO;
import br.net.walltec.api.rest.interceptors.RequisicaoInterceptor;
import br.net.walltec.api.utilitarios.Constantes;
import br.net.walltec.api.utilitarios.UtilData;
import br.net.walltec.api.vo.LancamentoVO;
import br.net.walltec.api.vo.UtilizacaoLancamentoVO;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;


/**
 * @author Administrador
 * 
 */

//TODO: atualizar as urls para n?o ter infinitivo e sim substantivos.
//TODO: Seguir a seguinte padroniza??o: PUT - atualiza; POST - cria;
@Path("/lancamentos")
@Produces(value=MediaType.APPLICATION_JSON)
@Interceptors({RequisicaoInterceptor.class})
@Api(value="Consultas de lançamentos")
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


	@GET
    @Path(value="/buscarLancamentos/{mes}/{ano}")
	@ApiOperation("Filtra os lançamentos por mês e ano")
	@ApiResponses(value= {
				@ApiResponse(code=200, message="Retorno bem sucedido", response=ConsultaLancamentosDTO.class ),
				@ApiResponse(code=500, message="Erro interno")
	 })    
	public Response buscarLancamentos(@PathParam("mes") Integer mes, @PathParam("ano") Integer ano){
        try {
        	FiltraParcelasDto dto = new FiltraParcelasDto(mes, ano);
        	ConsultaLancamentosDTO dtoRetorno = servico.consultaParcelasEmArvore(dto);
        	dtoRetorno.setMesFechado(servico.isMesFechado(mes, ano));
            return Response.ok(dtoRetorno).build();
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
	
	@ApiOperation("Efetua o pagamento de um lançamento")
	@ApiResponses(value= {
				@ApiResponse(code=202, message="Retorno bem sucedido"),
				@ApiResponse(code=500, message="Erro interno")
	 }) 	
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
	
	@ApiOperation("Efetua a utilização de um lançamento")
	@ApiResponses(value= {
				@ApiResponse(code=200, message="Retorno bem sucedido"),
				@ApiResponse(code=500, message="Erro interno")
	 }) 	
	public Response utilizarLancamento(UtilizacaoParcelasDto dto){
        try {
            return Response.ok(servico.utilizarLancamento(dto)).build();
        } catch (NegocioException e) {
            throw new WebServiceException(e.getMessage());
        }
		
	}	

	@GET
	@Path(value="/listarHistoricoUso")
	
	@ApiOperation("Lista o histórico de uso de um lançamento")
	@ApiResponses(value= {
				@ApiResponse(code=200, message="Retorno bem sucedido", response=UtilizacaoLancamentoVO.class ),
				@ApiResponse(code=500, message="Erro interno")
	 }) 	
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

	@ApiOperation("Incluir um lançamento")
	@ApiResponses(value= {
				@ApiResponse(code=200, message="Retorno bem sucedido"),
				@ApiResponse(code=500, message="Erro interno")
	 }) 		
	@Override
	public Response incluir(LancamentoVO objeto) throws WebServiceException {
        try {
            objeto = servico.incluirVO(objeto);
            
            return Response.ok(objeto).build();
        } catch (NegocioException e) {
            throw new WebServiceException(e.getMessage());
        } catch(Exception e){
            e.printStackTrace();
            throw new WebServiceException(e.getMessage());
        }
	}

	@ApiOperation("Alterar um lançamento")
	@ApiResponses(value= {
				@ApiResponse(code=200, message="Retorno bem sucedido", response=LancamentoVO.class),
				@ApiResponse(code=500, message="Erro interno")
	 }) 
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

	@ApiOperation("Excluir um lançamento")
	@ApiResponses(value= {
				@ApiResponse(code=200, message="Retorno bem sucedido"),
				@ApiResponse(code=500, message="Erro interno")
	 }) 	
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
	
	@ApiOperation("Grava um arquivo de banco")
	@ApiResponses(value= {
				@ApiResponse(code=200, message="Retorno bem sucedido", response =RetornoArquivoDTO.class),
				@ApiResponse(code=500, message="Erro interno")
	 }) 	
	@POST
	@Path("/gravar-arquivo")
	public Response gravarArquivo(GravacaoArquivoDto dto) throws WebServiceException {
		byte[] conteudoArquivoDesformatado = Base64.getDecoder().decode(dto.getArquivoBase64());
		List<RegistroExtratoDto> dadosArquivo;
		try {
			String dadosData[] = dto.getStrDataVencimento().split("/");
			Integer mes = Integer.valueOf(dadosData[1]);
			Integer ano = Integer.valueOf(dadosData[2]);
			List<LancamentoVO> lancamentos = FabricaConversores.getInstance().criarConversor(Lancamento.class, LancamentoVO.class)
					.converterEntidadeParaPojo(servico.listarParcelas(new FiltraParcelasDto(mes, ano)));
			dadosArquivo = importarArquivo(
					conteudoArquivoDesformatado, 
					lancamentos
					);
			
			RetornoArquivoDTO retorno = montarRetornoArquivoDTO(dadosArquivo, mes, ano);
			
			return Response.ok(retorno).build();
		} catch (WalltecException e) {
			e.printStackTrace();
            throw new WebServiceException(e.getMessage());
		}
	}

	/**
	 * @param conteudoArquivoDesformatado
	 * @param listaParcelas
	 * @return
	 * @throws WalltecException
	 */
	private List<RegistroExtratoDto> importarArquivo(byte[] conteudoArquivoDesformatado,
			List<LancamentoVO> listaParcelas) throws WalltecException {
		List<RegistroExtratoDto> dadosArquivo;
		dadosArquivo = mapImportadores
				.get("001")
				.importar("arquivo", 
						conteudoArquivoDesformatado, 
						listaParcelas
							.stream()
							.filter(l -> l.getIdFormaPagamento().equals(Constantes.ID_FORMA_PAGAMENTO_DEBITO))
							.collect(Collectors.toList()));
		return dadosArquivo;
	}

	/**
	 * @param dadosArquivo
	 * @param mes
	 * @param ano
	 * @return
	 * @throws NegocioException
	 */
	private RetornoArquivoDTO montarRetornoArquivoDTO(List<RegistroExtratoDto> dadosArquivo, Integer mes, Integer ano)
			throws NegocioException {
		RetornoArquivoDTO retorno = new RetornoArquivoDTO();
		retorno.setAno(ano);
		retorno.setMes(mes);
		retorno.setDadosArquivo(dadosArquivo);
		retorno.setMesEstaFechado(servico.isMesFechado(mes, ano));
		return retorno;
	}
	
	/* (non-Javadoc)
	 * @see br.net.walltec.api.rest.RequisicaoRestPadrao#listar()
	 */
	@Override
	public Response listar(@QueryParam(value="page") Integer pagina) throws WebServiceException {
		return Response.noContent().build();
	}
	
	
	@ApiOperation("Gera lançamentos a partir de vários parâmetros")
	@ApiResponses(value= {
				@ApiResponse(code=200, message="Retorno bem sucedido", response =LancamentoVO.class),
				@ApiResponse(code=500, message="Erro interno")
	 }) 	
	@POST
	@Path("/gerar-lancamento")
	public Response gerarLancamentos(GeracaoParcelasDto dto) throws WebServiceException {
		try {
			
			if (dto.getParcial()) {
				return Response.ok().entity(this.servico.montarListaLancamentosVO(dto)).build();
			} 
			List<LancamentoVO> vos = this.servico.gerarLancamentos(dto);
			return Response.ok().entity(vos).build();
		} catch (NegocioException e) {
			e.printStackTrace();
            throw new WebServiceException(e.getMessage());
		}
	}
	
	@ApiOperation("Retorna dashboards referentes aos lançamentos de um mês e ano")
	@ApiResponses(value= {
				@ApiResponse(code=200, message="Retorno bem sucedido", response =MapaDashboardDTO.class),
				@ApiResponse(code=500, message="Erro interno")
	 }) 	
	@GET
	@Path("/obter-dashboards/{mes}/{ano}")
	public Response gerarDashboards(@PathParam("mes") Integer mes, @PathParam("ano") Integer ano) throws WebServiceException {
		try {
			return Response.ok().entity(servico.montarDashboards(mes, ano)).build();
		} catch (NegocioException e) {
			e.printStackTrace();
            throw new WebServiceException(e.getMessage());
		}
	}	
	
	/* (non-Javadoc)
	 * @see br.net.walltec.api.rest.comum.RequisicaoRestPadrao#alterar(java.util.List)
	 */
	@ApiOperation("Associa um ou vários lançamentos a um extrato bancário")
	@ApiResponses(value= {
				@ApiResponse(code=200, message="Retorno bem sucedido"),
				@ApiResponse(code=500, message="Erro interno")
	 }) 	
	@PUT
	@Path("/associar-lancamento-extrato")
	public Response associarExtratoComLancamentos(List<RegistroExtratoDto> lista) throws WebServiceException {
        try {
        	servico.associarLancamentos(lista);
            return Response.ok(lista).build();
        } catch(TotalConciliadoInvalidoException e) {
        	throw new WebServiceException(Response.status(Status.BAD_REQUEST).entity(e.getMessage()).build());
        } catch (NegocioException e) {
            throw new WebServiceException(e.getMessage());
        } catch(Exception e){
            e.printStackTrace();
            throw new WebServiceException(e.getMessage());
        }
		
	}
	
	@ApiOperation("Fecha um mês contábil")
	@ApiResponses(value= {
				@ApiResponse(code=200, message="Retorno bem sucedido"),
				@ApiResponse(code=500, message="Erro interno")
	 }) 	
	@PUT
	@Path("/fechar-mes")
	public Response fecharMes(RegistroFechamentoMesDTO fechamentoDTO) throws WebServiceException {

		if (! UtilData.isMesValido(fechamentoDTO.getMes())) {
			throw new WebServiceException(Response.Status.BAD_REQUEST);
		}
		
		try {
			servico.fecharMes(fechamentoDTO);
		} catch (NegocioException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		    throw new WebServiceException(e.getMessage());
		}
		return Response.ok().build();
		
	}
	
	@ApiOperation("Desfaz a conciliação de um mês e ano")
	@ApiResponses(value= {
				@ApiResponse(code=200, message="Retorno bem sucedido"),
				@ApiResponse(code=500, message="Erro interno")
	 }) 	
	@PUT
	@Path("/desfazer-conciliacao")
	public Response desfazerConciliacoes(DesfazimentoConciliacaoDTO desfazimentoDTO) throws WebServiceException {
		if (!UtilData.isMesValido(desfazimentoDTO.getMes())) {
			throw new WebServiceException(Response.Status.BAD_REQUEST);
		}
		try {
			servico.desfazerConciliacoes(desfazimentoDTO);
		} catch (NegocioException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		    throw new WebServiceException(e.getMessage());
		}
		return Response.ok().build();		
		
	}
	
	@ApiOperation("Retorna o mapa do ano")
	@ApiResponses(value= {
				@ApiResponse(code=200, message="Retorno bem sucedido", response=ResumoMesAnoDTO.class),
				@ApiResponse(code=500, message="Erro interno")
	 }) 	
	@GET
	@Path("/obter-mapa-ano/{ano}")
	public Response gerarMapaAno(@PathParam("ano") Integer ano) throws WebServiceException {
		if (ano == null || ano == 0) {
			throw new WebServiceException("Ano deve ser informado!");
		}
		
		try {
			List<ResumoMesAnoDTO> mapaAnual = servico.gerarMapaAno(ano);
			return Response.ok().entity(mapaAnual).build();		
		} catch(NegocioException e) {
			e.printStackTrace();
		    throw new WebServiceException(e.getMessage());
		}
	}

	@ApiOperation("Lista os totais de uma rubrica agrupados por mês durante um ano")
	@ApiResponses(value= {
				@ApiResponse(code=200, message="Retorno bem sucedido", response=LancamentosPorRubricaDTO.class),
				@ApiResponse(code=500, message="Erro interno")
	 }) 	
	@GET
	@Path("/rubricas-lancamentos/{ano}/{rubrica}")
	public Response obterResumoPorRubricaEAno(@PathParam("rubrica") Integer idRubrica, @PathParam("ano") Integer ano) throws WebServiceException {
		if (ano == null || ano == 0 || idRubrica == null) {
			throw new WebServiceException("Ano e rubrica devem ser informados!");
		}
		
		try {
			return Response.ok().entity(this.servico.listarLancamentosPorRubricaEAno(ano, idRubrica)).build();		
		} catch(NegocioException e) {
			e.printStackTrace();
		    throw new WebServiceException(e.getMessage());
		}		
	}

}


