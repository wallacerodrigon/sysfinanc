package br.net.walltec.api.persistencia.dao.impl;


import java.math.BigDecimal;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import javax.inject.Inject;
import javax.inject.Named;
import javax.persistence.EntityManager;
import javax.transaction.TransactionScoped;
import javax.transaction.Transactional;
import javax.transaction.Transactional.TxType;

import org.hibernate.Query;

import br.net.walltec.api.dto.LancamentosPorRubricaDTO;
import br.net.walltec.api.dto.ResumoMesAnoDTO;
import br.net.walltec.api.entidades.Lancamento;
import br.net.walltec.api.excecoes.PersistenciaException;
import br.net.walltec.api.persistencia.dao.LancamentoDao;
import br.net.walltec.api.persistencia.dao.comum.AbstractPersistenciaPadraoDao;
import br.net.walltec.api.utilitarios.Constantes;
import br.net.walltec.api.utilitarios.UtilData;
import br.net.walltec.api.vo.ResumoLancamentosVO;
import br.net.walltec.api.vo.UtilizacaoLancamentoVO;

@Named
public class LancamentoDaoImpl extends AbstractPersistenciaPadraoDao<Lancamento> implements LancamentoDao {

    @Inject
    private EntityManager em;

	public LancamentoDaoImpl(EntityManager em) {
		super(em);
	}

	public List<Lancamento> listarParcelas(Date dataInicial, Date dataFinal, Integer idConta, Integer idParcelaOrigem) throws PersistenciaException {
		
		
		StringBuilder hql = new StringBuilder("select p from Lancamento p join p.conta c where 1=1 ");
		Map<String, Object> mapa = new HashMap<String, Object>();
		if (dataInicial != null && dataFinal != null) {
			hql.append(" and p.dataVencimento between :dataInicial and :dataFinal ");
			mapa.put("dataInicial", dataInicial);
			mapa.put("dataFinal", dataFinal);
		}
		
		if (idConta != null) {
			hql.append(" and c.id = :idConta ");
			mapa.put("idConta", idConta);
		}
		
		if (idParcelaOrigem != null) {
			hql.append(" and p.lancamentoOrigem.id = :idParcelaOrigem ");
			mapa.put("idParcelaOrigem", idParcelaOrigem);
		}
		
		hql.append(" order by p.dataVencimento, p.descricao ");
        return listarQueryECachear(hql.toString(), Lancamento.class, mapa);
	}

	@Override
	public ResumoLancamentosVO obterResumoLancamentos(Integer mes,
															Integer ano) throws PersistenciaException {
		String sql = "select case when ln_despesa then 'S' else 'N' end as tipo, sum(va_parcela) as total "
				+ "   from parcela p "
				+ "   join conta c on c.co_conta = p.co_conta "
				+ "   where year(dt_vencimento) = :ano and month(dt_vencimento)= :mes " 
				+ "   group by ln_despesa ";

		Map<String, Object> params = new HashMap<String, Object>();
		params.put("ano", ano);
		params.put("mes", mes);
		List<Object[]> result = listarQueryNativaWithParams(sql, params);
		if (result != null){
			ResumoLancamentosVO vo = new ResumoLancamentosVO();
			
			for(Object[] rows : result){
				if (rows[0].toString().equals("S")){
					vo.setTotalDespesas(new Double(rows[1].toString()));
				} else {
					vo.setTotalReceitas(new Double(rows[1].toString()));
				}
			}
			
			return vo; 
		}
		
		return null;
	}
	

	@Override
	public List<UtilizacaoLancamentoVO> listarUsos(Integer idLancamentoOrigem) throws PersistenciaException {
		
		StringBuffer buffer = new StringBuffer();
		buffer.append("select new br.net.walltec.api.vo.UtilizacaoLancamentoVO(p.dataVencimento, p.valor, p.descricao, p.numero) ");
		buffer.append("from Lancamento p  ");
		buffer.append("where p.lancamentoOrigem.id = :idLancamentoOrigem and p.lancamentoOrigem.id != p.id ");
		buffer.append("order by p.numero ");

		Map<String, Object> parametros = new HashMap<String, Object>();
		parametros.put("idLancamentoOrigem", idLancamentoOrigem);
		return listarQueryECachear(buffer.toString(), UtilizacaoLancamentoVO.class, parametros);
	}

	/* (non-Javadoc)
	 * @see br.net.walltec.api.persistencia.dao.LancamentoDao#associarLancamentoComExtrato(java.lang.Integer, java.lang.String)
	 */
	@Override
	public boolean associarLancamentoComExtrato(Integer idLancamento, String numDocumento, Date dataVencimento) throws PersistenciaException {
		String hql = 
				  "update Lancamento set numDocumento = :numDocumento, bolPaga = true, bolConciliado = true, dataVencimento = :dataVencimento "
				+ "where id = :idLancamento and bolConciliado = false";
		Map<String, Object> mapParams = new HashMap<>();
		mapParams.put("idLancamento", idLancamento);
		mapParams.put("numDocumento", numDocumento);
		mapParams.put("dataVencimento", dataVencimento);
		
		return this.executarUpdateHql(hql, mapParams);
		
	}

	/* (non-Javadoc)
	 * @see br.net.walltec.api.persistencia.dao.LancamentoDao#gerarMapaAno(java.lang.Integer)
	 */
	@Override
	public List<ResumoMesAnoDTO> gerarMapaAno(Integer ano) throws PersistenciaException {
		StringBuilder builder = new StringBuilder("select month(dt_vencimento) as mes, ");
		builder.append("     sum( case when c.ln_despesa then va_parcela else 0 end ) as despesa, ");
		builder.append("     sum( case when c.ln_despesa then 0 else va_parcela end ) as receita, ");
		builder.append("     sum( case when l.bolConciliado=1 and c.ln_despesa = 0 then va_parcela else 0 end ) as credConciliado, ");
		builder.append("     sum( case when l.bolConciliado=1 and c.ln_despesa = 1 then va_parcela else 0 end ) as debConciliado ");		
		builder.append("from lancamento l ");
		builder.append(" join conta c on (c.co_conta = l.co_conta) " );
		builder.append("where dt_vencimento between :dataInicio and :dataFim ");
		builder.append(" group by month(dt_vencimento) ");
		builder.append(" order by mes ");
		Map<String, Object> parametros = new HashMap<>();
		parametros.put("dataInicio", UtilData.createDataSemHoras(1, 1, ano));
		parametros.put("dataFim", UtilData.createDataSemHoras(31, 12, ano));
		return this
				.listarQueryNativaWithParams(builder.toString(), parametros)
				.stream()
				.map(obj -> new ResumoMesAnoDTO(ano, (Integer)obj[0], (BigDecimal)obj[1], (BigDecimal)obj[2],((BigDecimal)obj[3]).subtract((BigDecimal)obj[4])) )
				.collect(Collectors.toList());
	}

	/* (non-Javadoc)
	 * @see br.net.walltec.api.persistencia.dao.LancamentoDao#listarLancamentosPorRubricaEAno(java.lang.Integer, java.lang.Integer)
	 */
	@Override
	public List<LancamentosPorRubricaDTO> listarLancamentosPorRubricaEAno(Integer ano, Integer idRubrica)
			throws PersistenciaException {
		StringBuilder builder = new StringBuilder();
		builder.append("select month(l.dataVencimento), ");
		builder.append("       sum(l.valor) ");
		builder.append(" from Lancamento l ");
		builder.append(" join l.conta c ");
		builder.append(" where year(l.dataVencimento) = :ano ");
		builder.append("   and c.id = :idRubrica ");
		builder.append("   and l.bolPaga = true ");
		builder.append(" group by month(l.dataVencimento) ");
		builder.append(" order by 1 ");
		
		Map<String, Object> params = new HashMap<>();
		params.put("ano", ano);
		params.put("idRubrica", idRubrica);
		List<Object[]> resultado = this.listarQueryECachear(builder.toString(), Object[].class, params);
		
		return resultado
				.stream()
				.map(dados -> {
					BigDecimal totalDoMes =  (BigDecimal)dados[1];
					LancamentosPorRubricaDTO dto = new LancamentosPorRubricaDTO((Integer)dados[0], "", totalDoMes, 0.0);
					dto.setAno(ano);
					return dto;
				})
				.collect(Collectors.toList());
		
	}

	/* (non-Javadoc)
	 * @see br.net.walltec.api.persistencia.dao.LancamentoDao#excluirParcelasPagasDebitoPorPeriodo(java.util.Date, java.util.Date)
	 */
	@Override
	@TransactionScoped
	@Transactional(value=TxType.REQUIRED, rollbackOn=Exception.class)
	public void excluirParcelasPagasDebitoPorPeriodo(Date dataInicio, Date dataFim) throws PersistenciaException {
		Map<String, Object> params = new HashMap<>();
		params.put("dataInicio", dataInicio);
		params.put("dataFim", dataFim);
		params.put("idFormaPagamento", Constantes.ID_FORMA_PAGAMENTO_DEBITO);
		
		String hql ="update Lancamento l set l.lancamentoOrigem = null where l.dataVencimento between :dataInicio and :dataFim and l.formaPagamento.id = :idFormaPagamento and l.bolPaga = true";
		this.executarUpdateHql(hql, params);
		
		hql ="delete from Lancamento where dataVencimento between :dataInicio and :dataFim and formaPagamento.id = :idFormaPagamento";
		this.executarUpdateHql(hql, params);
		
	}
	
}
