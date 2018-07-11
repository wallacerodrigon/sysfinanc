package br.net.walltec.api.persistencia.dao.impl;


import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.inject.Inject;
import javax.inject.Named;
import javax.persistence.EntityManager;
import javax.transaction.Transactional;
import javax.transaction.Transactional.TxType;

import br.net.walltec.api.entidades.Lancamento;
import br.net.walltec.api.excecoes.PersistenciaException;
import br.net.walltec.api.persistencia.dao.LancamentoDao;
import br.net.walltec.api.persistencia.dao.comum.AbstractPersistenciaPadraoDao;
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
				+ "   where year(dt_vencimento) = ? and month(dt_vencimento)= ? " 
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


}
