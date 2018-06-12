package br.net.walltec.api.persistencia.dao.impl;


import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.inject.Inject;
import javax.inject.Named;
import javax.persistence.EntityManager;

import org.hibernate.Hibernate;

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

	public List<Lancamento> listarParcelas(Date dataInicial, Date dataFinal) throws PersistenciaException {
		
		
		String hql = "select p "
				+ " from Lancamento p join p.conta c"
				+ " where p.dataVencimento between :dataInicial and :dataFinal order by p.dataVencimento, p.descricao ";
		Map<String, Object> mapa = new HashMap<String, Object>();
		mapa.put("dataInicial", dataInicial);
		mapa.put("dataFinal", dataFinal);
        return listarQueryECachear(hql, null, mapa);
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


}
