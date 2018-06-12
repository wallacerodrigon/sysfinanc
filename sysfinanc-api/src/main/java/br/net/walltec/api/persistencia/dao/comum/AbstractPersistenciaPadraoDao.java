package br.net.walltec.api.persistencia.dao.comum;

import java.io.Serializable;
import java.lang.reflect.Field;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.ParameterizedType;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.persistence.EntityManager;
import javax.persistence.EntityTransaction;
import javax.persistence.Query;
import javax.persistence.TypedQuery;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

import org.apache.commons.beanutils.BeanUtils;

import br.net.walltec.api.entidades.comum.EntidadeBasica;
import br.net.walltec.api.excecoes.PersistenciaException;
import br.net.walltec.api.utilitarios.Constantes;


@SuppressWarnings({ "unchecked", "rawtypes" })

public abstract class AbstractPersistenciaPadraoDao<T> implements PersistenciaPadraoDao<T>  {

	private Class<T> classeDoObjeto;
	private EntityManager em;
	
	
	public AbstractPersistenciaPadraoDao(EntityManager em){
		classeDoObjeto = (Class) ((ParameterizedType)getClass().getGenericSuperclass()).getActualTypeArguments()[0];
		this.em = em;
	}

	@Override
	public T incluir(T objeto) throws PersistenciaException {
		em.persist(objeto);
		return objeto;
	}

	@Override
	public void alterar(T objeto) throws PersistenciaException {
		em.merge(objeto);
		
	}

	@Override
	public void excluir(T objeto) throws PersistenciaException {
		em.remove(objeto);
	}
	
	public void executarUpdate(String sqlNativo) throws PersistenciaException {
		em.createNativeQuery(sqlNativo).executeUpdate();
	}

	public void executarUpdateHql(String script) throws PersistenciaException {
		em.createQuery(script).executeUpdate();
	}
	
	@Override
	public T find(Serializable id) throws PersistenciaException {
		return em.find(classeDoObjeto, id);
	}

	@Override
	public List<T> listar(int pagina) throws PersistenciaException {
		return this.montarConsultaCriteria(null, pagina, Constantes.QTD_REGISTROS_PAGINA).getResultList();
	}

	private TypedQuery<T> montarConsultaCriteria(T filtro, int pagina, int qtdRegistrosPagina) {
		CriteriaBuilder criteriaBuilder = em.getCriteriaBuilder();
		CriteriaQuery<T> criteriaQuery = (CriteriaQuery<T>) criteriaBuilder.createQuery(classeDoObjeto);
		Root<T> from = criteriaQuery.from(classeDoObjeto);
		CriteriaQuery<T> select = criteriaQuery.select(from);
		List<Predicate> predicados = new ArrayList<Predicate>();

		if (filtro != null){

			for(Field field : classeDoObjeto.getDeclaredFields()){
			 	try {
			 		if (! field.getName().equalsIgnoreCase("serialVersionUID")){
				 		Object value = BeanUtils.getProperty(filtro, field.getName());

			 			if (value != null){
			 				if (value instanceof EntidadeBasica){
			 					continue;
			 				}
			 				predicados.add( criteriaBuilder
			 									.and(criteriaBuilder.equal(from.get(field.getName()), value)) );
			 			}
			 		}
				} catch (IllegalAccessException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				} catch (InvocationTargetException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				} catch (NoSuchMethodException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
			}

		}

		if (! predicados.isEmpty()){
			select.where( predicados.toArray(new Predicate[predicados.size()]) );
		}
		
		return pagina != 0 ? 
				em.createQuery(criteriaQuery).setMaxResults(qtdRegistrosPagina).setFirstResult(pagina*qtdRegistrosPagina) :
				em.createQuery(criteriaQuery);
	}

	//TODO: rever
	@Override
	public List<T> listar(T objetoFiltro) throws PersistenciaException {
		return montarConsultaCriteria(objetoFiltro, 0, Constantes.QTD_REGISTROS_PAGINA).getResultList();
	}

	@Override
	public T pesquisar(T filtro) throws PersistenciaException {
		return this.montarConsultaCriteria(filtro, 0, Constantes.QTD_REGISTROS_PAGINA).getSingleResult();
	}
	
	public List<T> listarHql(String hql) throws PersistenciaException {
		return em.createQuery(hql).getResultList();
	}

	public List<T> listarHql(StringBuilder hql) throws PersistenciaException {
		return listarHql(hql.toString());
	}
	
	public T filtrarHql(String hql) throws PersistenciaException {
		return (T)em.createQuery(hql).getSingleResult();
	}

	public T filtrarHql(StringBuilder hql) throws PersistenciaException {
		return filtrarHql(hql.toString());
	}
	
	public List<T> filtrarPorHqlAndParams(String hql, Map<String, Object> parametros) throws PersistenciaException {
		Query query = em.createQuery(hql);
		
		if (parametros != null && !parametros.isEmpty()){
			for(Map.Entry<String, Object> param : parametros.entrySet()){
				if (param.getValue() != null) {
					query.setParameter(param.getKey(), param.getValue());
				}
			}
		}
		
		return query.getResultList();
	}

	/* (non-Javadoc)
	 * @see br.net.walltec.api.persistencia.dao.comum.PersistenciaPadraoDao#getTransaction()
	 */
	@Override
	public EntityTransaction getTransaction() throws PersistenciaException {
		return em.getTransaction();
	}
	
	public List<Object[]> listarQueryNativa(String sql) throws PersistenciaException {
		return em.createNativeQuery(sql).getResultList();
	}
	
	public List<Object[]> listarQueryNativaWithParams(String sql, Map<String, Object> parametros) throws PersistenciaException {
		Query query = em.createNativeQuery(sql);
		int i = 1;
		if (parametros != null && !parametros.isEmpty()){
			for(Map.Entry<String, Object> param : parametros.entrySet()){
				if (param.getValue() != null) {
					query.setParameter(i++, param.getValue());
				}
			}
		}
		return query.getResultList();
	}

	public <X>List<X> listarQueryECachear(String hql, Class<X> classeRetorno, Map<String, Object> parametros) throws PersistenciaException {
		Query query = getQueryConfigurada(hql, parametros);
		//query.setHint(QueryHints.CACHEABLE, "true");
		return query.getResultList();
	}

	/**
	 * @param hql
	 * @param parametros
	 */
	private Query getQueryConfigurada(String hql, Map<String, Object> parametros) {
		Query query = em.createQuery(hql);
		
		if (parametros != null && !parametros.isEmpty()){
			for(Map.Entry<String, Object> param : parametros.entrySet()){
				query.setParameter(param.getKey(), param.getValue());
			}
		}
		
		return query;
	}
	
	public <X>List<X> listarQuery(String hql, Class<X> classeRetorno, Map<String, Object> parametros) throws PersistenciaException {
		Query query = getQueryConfigurada(hql, parametros);
		return query.getResultList();
	}	
}
