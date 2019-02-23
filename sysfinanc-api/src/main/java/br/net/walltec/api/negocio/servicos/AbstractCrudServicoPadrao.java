package br.net.walltec.api.negocio.servicos;

import java.io.Serializable;
import java.lang.reflect.Field;
import java.util.List;
import java.util.logging.Logger;

import javax.annotation.PostConstruct;
import javax.enterprise.context.Dependent;
import javax.inject.Named;
import javax.persistence.EmbeddedId;
import javax.persistence.Id;
import javax.transaction.Transactional;
import javax.transaction.Transactional.TxType;

import org.apache.commons.beanutils.BeanUtils;

import br.net.walltec.api.conversores.ConversorPadrao;
import br.net.walltec.api.conversores.FabricaConversores;
import br.net.walltec.api.excecoes.ConversorNaoExistenteException;
import br.net.walltec.api.excecoes.NegocioException;
import br.net.walltec.api.excecoes.PersistenciaException;
import br.net.walltec.api.negocio.servicos.comum.CrudPadraoServico;
import br.net.walltec.api.persistencia.dao.comum.PersistenciaPadraoDao;
import br.net.walltec.api.vo.GerenciadorPadraoVO;

/**
 * Classe abstrata com os métodos padrões para os serviços
 * @author wallace
 *
 * @param <T>
 * @param <V>
 */
@Transactional(value=TxType.REQUIRED)
@SuppressWarnings({"rawtypes", "unchecked"})
@Named
@Dependent
public abstract class AbstractCrudServicoPadrao<T,  V extends GerenciadorPadraoVO> implements CrudPadraoServico<T, V> {

	private PersistenciaPadraoDao<T> dao;

	private FabricaConversores fabricaConversor = FabricaConversores.getInstance();
	
	private java.util.logging.Logger log = java.util.logging.Logger.getLogger(getClass().getName());
	
	private ConversorPadrao<T,V> conversor;

	@Override
	protected void finalize() throws Throwable {
		super.finalize();
	}

	@PostConstruct
	private void init() throws Exception {
		try {
			conversor = fabricaConversor.criarConversor(getClasseEntidade(), getClassePojo());
		} catch (ConversorNaoExistenteException e) {
			throw e;
		}
	}


	protected abstract Class getClasseEntidade();
		//return (Class) ((ParameterizedType)getClass().getGenericSuperclass()).getActualTypeArguments()[0];
	

	protected abstract Class getClassePojo(); 
//		return (Class) ((ParameterizedType)getClass().getGenericSuperclass()).getActualTypeArguments()[1];
	
	
	@Transactional(value=TxType.REQUIRES_NEW)	
	public void incluir(T objeto) throws NegocioException {
		try {
			objeto = getDao().incluir(objeto);
		} catch (PersistenciaException e) {
			throw new NegocioException(e);
		}

	}

	private T getEntidade(V objeto) {
		return (T)getConversor().converterPojoParaEntidade(objeto);
	}

	private V getPojo(T objeto) {
		return (V)getConversor().converterEntidadeParaPojo(objeto);
	}

	@Override
	@Transactional(value=TxType.REQUIRES_NEW)		
	public void alterar(T objeto) throws NegocioException {
		try {
			getDao().alterar((objeto));
		} catch (Exception e) {
			throw new NegocioException(e);
		}

	}

	@Override
	@Transactional(value=TxType.REQUIRES_NEW)		
	public void excluir(Serializable id) throws NegocioException {
		
		try {
			T objeto = getDao().find(id);
			getDao().excluir(objeto);
		} catch (PersistenciaException e) {
			throw new NegocioException(e);
		}

	}

	private Serializable getIdObjeto(T objeto) throws Exception {
		
		for(Field f : this.getClasseEntidade().getDeclaredFields()){
			if (f.isAnnotationPresent(Id.class) || f.isAnnotationPresent(EmbeddedId.class) ){
				String retorno = BeanUtils.getProperty(objeto, f.getName());
				return f.getType() == Integer.class ? Integer.valueOf(retorno) : retorno;
			}
		}
		
		return null;
	}


	@Override
	public void alterar(List<T> objetos) throws NegocioException {
		for(T obj : objetos){
			this.alterar(obj);
		}
	}
	
	@Override
	@Transactional(value=TxType.NOT_SUPPORTED)	
	public T find(Serializable id) throws NegocioException {
        try {
            return getDao().find(id);
        } catch (PersistenciaException e) {
            throw new NegocioException(e);
        }
    }
	

	@Override
	@Transactional(value=TxType.NOT_SUPPORTED)	
	public V buscar(Serializable id) throws NegocioException {
		return getPojo(this.find(id));
	}

	@Override
	@Transactional(value=TxType.NOT_SUPPORTED)	
	public V pesquisar(V filtro) throws NegocioException {
        try {
            return getPojo(
                    getDao().pesquisar(
                            getEntidade(filtro)) );
        } catch (PersistenciaException e) {
            throw new NegocioException(e);

        }
    }

	@Transactional(value=TxType.NOT_SUPPORTED)	
	@Override
	public List<V> listar(V objetoFiltro) throws NegocioException {
        try {
            return getConversor()
                    .converterEntidadeParaPojo(
                            getDao().listar(getEntidade(objetoFiltro)
                    ));
        } catch (PersistenciaException e) {
            throw new NegocioException(e);

        }
    }

	@Transactional(value=TxType.NOT_SUPPORTED)	
	@Override
	public List<V> listarTudo(int pagina) throws NegocioException {
        try {
            return getConversor()
                    .converterEntidadeParaPojo(
                            getDao().listar(pagina)
                    );
        } catch (PersistenciaException e) {
            throw new NegocioException(e);

        }
    }


	public ConversorPadrao getConversor() {
		return conversor;
	}

	protected Logger getLogger(){
		return log;
	}


	public PersistenciaPadraoDao<T> getDao() {
		return dao;
	}


	public void setDao(PersistenciaPadraoDao<T> dao) {
		this.dao = dao;
	}


	@Override
	public V incluirVO(V objeto) throws NegocioException {
		// TODO Auto-generated method stub
		T objetoConvertido = conversor.converterPojoParaEntidade(objeto);
		this.incluir(objetoConvertido);
		return conversor.converterEntidadeParaPojo(objetoConvertido);
	}

	@Transactional(value=TxType.REQUIRES_NEW)	
	public void incluirVO(List<V> objetos) throws NegocioException {
		for(V objeto : objetos) {
			this.incluirVO(objeto);
		}
	}


	@Override
	public V alterarVO(V objeto) throws NegocioException {
		// TODO Auto-generated method stub
		this.alterar(conversor.converterPojoParaEntidade(objeto));
		return objeto;
	}


	/**
	 * @return the fabricaConversor
	 */
	protected FabricaConversores getFabricaConversor() {
		return fabricaConversor;
	}

	
}
