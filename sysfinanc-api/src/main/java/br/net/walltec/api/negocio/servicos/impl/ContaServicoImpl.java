package br.net.walltec.api.negocio.servicos.impl;

import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.annotation.PostConstruct;
import javax.inject.Inject;
import javax.inject.Named;
import javax.persistence.EntityManager;

import br.net.walltec.api.dto.GeracaoParcelasDto;
import br.net.walltec.api.entidades.Conta;
import br.net.walltec.api.entidades.FormaPagamento;
import br.net.walltec.api.entidades.Lancamento;
import br.net.walltec.api.entidades.TipoConta;
import br.net.walltec.api.excecoes.NegocioException;
import br.net.walltec.api.excecoes.PersistenciaException;
import br.net.walltec.api.negocio.servicos.AbstractCrudServicoPadrao;
import br.net.walltec.api.negocio.servicos.ContaServico;
import br.net.walltec.api.persistencia.dao.ContaDao;
import br.net.walltec.api.persistencia.dao.LancamentoDao;
import br.net.walltec.api.persistencia.dao.TipoContaDao;
import br.net.walltec.api.persistencia.dao.impl.ContaDaoImpl;
import br.net.walltec.api.persistencia.dao.impl.LancamentoDaoImpl;
import br.net.walltec.api.persistencia.dao.impl.TipoContaDaoImpl;
import br.net.walltec.api.utilitarios.Constantes;
import br.net.walltec.api.utilitarios.UtilData;
import br.net.walltec.api.vo.RubricaVO;

@Named
public class ContaServicoImpl extends AbstractCrudServicoPadrao<Conta, RubricaVO> implements ContaServico {

    @Inject
    private EntityManager em;

    private ContaDao contaDao;

    private TipoContaDao tipoContaDao;
    
    
    private LancamentoDao lancamentoDao;

    @PostConstruct
    public void init(){
        contaDao = new ContaDaoImpl(em);
        lancamentoDao = new LancamentoDaoImpl(em);
        tipoContaDao = new TipoContaDaoImpl(em);
        setDao(contaDao);
    }

    @Override
    protected Class getClasseEntidade() {
        return Conta.class;
    }

    @Override
    protected Class getClassePojo() {
        return RubricaVO.class;
    }

    @Override
    public List<RubricaVO> listar(RubricaVO objetoFiltro) throws NegocioException {
        return super.listar(objetoFiltro);
    }

    @Override
    public List<Lancamento> criarParcelas(GeracaoParcelasDto dto) throws NegocioException {
    		Integer qtd = dto.getQuantidade();
            Conta conta = this.find(dto.getIdConta());
            conta.getListaLancamentos().size();
 
            Integer numProxParcela = gerarNumeroProxLancamento(conta);
            Date dataVencimento = UtilData.getData(dto.getDataVencimentoStr(), UtilData.SEPARADOR_PADRAO);
            List<Lancamento> listaParcelasGeradas = new ArrayList<Lancamento>();
            for(int i = 0; i < qtd; i++){
                listaParcelasGeradas.add( montarLancamento(dto, conta, numProxParcela, dataVencimento) );
                dataVencimento = UtilData.somarData(dataVencimento, 1, ChronoUnit.MONTHS);
                numProxParcela++;
            }

            if (dto.getParcial()){
            	return listaParcelasGeradas;
            } else {
            	conta.getListaLancamentos().addAll(listaParcelasGeradas);
            	super.alterar(conta);
            	return conta.getListaLancamentos();
            } 

    }

	/**
	 * @param dto
	 * @param conta
	 * @param numLancamento
	 * @param dataVencimento
	 * @param listaParcelasGeradas
	 */
	private Lancamento montarLancamento(GeracaoParcelasDto dto, Conta conta, Integer numLancamento, Date dataVencimento) {
		Lancamento p = new Lancamento();
		p.setNumero(numLancamento.shortValue());
		p.setConta(conta);
		p.setDataVencimento(dataVencimento);
		p.setValor(dto.getValorVencimento());
		p.setDescricao(dto.getDescricaoParcela());
		p.setBolPaga(false);
		p.setBolConciliado(false);

		p.setFormaPagamento(new FormaPagamento());
		p.getFormaPagamento().setId(Constantes.ID_FORMA_PAGAMENTO_PADRAO);

		if (dto.getIdParcelaOrigem() != null) {
			p.setLancamentoOrigem(new Lancamento());
			p.getLancamentoOrigem().setId(dto.getIdParcelaOrigem());
		}
		return p;
	}

    @Override
    public Integer gerarNumeroProxLancamento(Conta conta) throws NegocioException {
        if (conta.getListaLancamentos() != null && conta.getListaLancamentos().size() > 0){
            Lancamento p = conta.getListaLancamentos().get(conta.getListaLancamentos().size()-1);
            return new Integer(p.getNumero())+1;
        }
        return 1;
    }


}


