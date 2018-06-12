package br.net.walltec.api.persistencia.dao.impl;


import br.net.walltec.api.entidades.Conta;
import br.net.walltec.api.excecoes.PersistenciaException;
import br.net.walltec.api.persistencia.dao.ContaDao;
import br.net.walltec.api.persistencia.dao.comum.AbstractPersistenciaPadraoDao;

import java.util.List;

import javax.inject.Inject;
import javax.inject.Named;
import javax.persistence.EntityManager;

@Named
public class ContaDaoImpl extends AbstractPersistenciaPadraoDao<Conta> implements ContaDao {


    @Inject
    private EntityManager em;

	public ContaDaoImpl(EntityManager em) {
		super(em);
	}


	/* (non-Javadoc)
	 * @see br.net.walltec.api.persistencia.dao.comum.AbstractPersistenciaPadraoDao#listar(java.lang.Object)
	 */
	@Override
	public List<Conta> listar(Conta objetoFiltro) throws PersistenciaException {
		// TODO Auto-generated method stub
		return listarQueryECachear("from Conta", Conta.class, null);
	}

}
