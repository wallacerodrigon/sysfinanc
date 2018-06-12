package br.net.walltec.api.persistencia.dao.impl;

import br.net.walltec.api.entidades.ParcelaUtilizacao;
import br.net.walltec.api.persistencia.dao.ParcelaUtilizacaoDao;
import br.net.walltec.api.persistencia.dao.comum.AbstractPersistenciaPadraoDao;

import javax.inject.Inject;
import javax.inject.Named;
import javax.persistence.EntityManager;

@Named
public class ParcelaUtilizacaoDaoImpl extends AbstractPersistenciaPadraoDao<ParcelaUtilizacao>
		implements ParcelaUtilizacaoDao {

	@Inject
	private EntityManager em;

	public ParcelaUtilizacaoDaoImpl(EntityManager em) {
		super(em);
	}
}
