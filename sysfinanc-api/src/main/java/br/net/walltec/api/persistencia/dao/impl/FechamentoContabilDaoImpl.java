package br.net.walltec.api.persistencia.dao.impl;


import javax.inject.Inject;
import javax.inject.Named;
import javax.persistence.EntityManager;

import br.net.walltec.api.entidades.FechamentoContabil;
import br.net.walltec.api.persistencia.dao.FechamentoContabilDao;
import br.net.walltec.api.persistencia.dao.comum.AbstractPersistenciaPadraoDao;

@Named
public class FechamentoContabilDaoImpl extends AbstractPersistenciaPadraoDao<FechamentoContabil> implements FechamentoContabilDao {


    @Inject
    private EntityManager em;

	public FechamentoContabilDaoImpl(EntityManager em) {
		super(em);
	}


}
