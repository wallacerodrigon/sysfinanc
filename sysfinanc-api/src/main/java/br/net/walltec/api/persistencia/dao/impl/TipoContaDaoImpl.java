package br.net.walltec.api.persistencia.dao.impl;


import br.net.walltec.api.entidades.TipoConta;
import br.net.walltec.api.persistencia.dao.TipoContaDao;
import br.net.walltec.api.persistencia.dao.comum.AbstractPersistenciaPadraoDao;

import javax.inject.Inject;
import javax.inject.Named;
import javax.persistence.EntityManager;

@Named
public class TipoContaDaoImpl extends AbstractPersistenciaPadraoDao<TipoConta> implements TipoContaDao {

	@Inject
	private EntityManager em;

	public TipoContaDaoImpl(EntityManager em) {
		super(em);
	}
}
