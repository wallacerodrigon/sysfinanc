/**
 * 
 */
package br.net.walltec.api.negocio.servicos.impl;

import javax.annotation.PostConstruct;
import javax.inject.Inject;
import javax.inject.Named;
import javax.persistence.EntityManager;

import br.net.walltec.api.entidades.TipoConta;
import br.net.walltec.api.negocio.servicos.AbstractCrudServicoPadrao;
import br.net.walltec.api.negocio.servicos.TipoContaServico;
import br.net.walltec.api.persistencia.dao.TipoContaDao;
import br.net.walltec.api.persistencia.dao.impl.TipoContaDaoImpl;
import br.net.walltec.api.vo.TipoContaVO;

/**
 * @author wallace
 *
 */
@Named
public class TipoContaServicoImpl  extends AbstractCrudServicoPadrao<TipoConta, TipoContaVO> implements TipoContaServico {

    @Inject
    private EntityManager em;
    
    private TipoContaDao tipoContaDao;

    @PostConstruct
    public void init(){
        tipoContaDao = new TipoContaDaoImpl(em);
        setDao(tipoContaDao);
    }    
	
	/* (non-Javadoc)
	 * @see br.net.walltec.api.negocio.servicos.AbstractCrudServicoPadrao#getClasseEntidade()
	 */
	@Override
	protected Class getClasseEntidade() {
		// TODO Auto-generated method stub
		return TipoConta.class;
	}

	/* (non-Javadoc)
	 * @see br.net.walltec.api.negocio.servicos.AbstractCrudServicoPadrao#getClassePojo()
	 */
	@Override
	protected Class getClassePojo() {
		// TODO Auto-generated method stub
		return TipoContaVO.class;
	}

	}
