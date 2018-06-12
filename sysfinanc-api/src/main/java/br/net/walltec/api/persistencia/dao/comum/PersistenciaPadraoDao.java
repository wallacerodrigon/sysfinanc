package br.net.walltec.api.persistencia.dao.comum;



import br.net.walltec.api.excecoes.PersistenciaException;

import java.io.Serializable;
import java.util.List;
import java.util.Map;

import javax.persistence.EntityTransaction;


/**
 * @author wallace
 *
 * @param <T>
 */
public interface PersistenciaPadraoDao<T>  {

	 T incluir(T objeto) throws PersistenciaException;

	 void alterar(T objeto) throws PersistenciaException;
	 
	 void excluir(T objeto) throws PersistenciaException;
	 
	 T find(Serializable id) throws PersistenciaException;
	 
	 T pesquisar(T filtro) throws PersistenciaException;
	 
	 List<T> listar(int pagina) throws PersistenciaException;

	 List<T> listar(T objetoFiltro) throws PersistenciaException;	
	 
	 void executarUpdate(String sqlNativo) throws PersistenciaException;
	 
	 void executarUpdateHql(String script) throws PersistenciaException;
	 
	 List<Object[]> listarQueryNativa(String sql) throws PersistenciaException;
	 
	 List<Object[]> listarQueryNativaWithParams(String sql, Map<String, Object> parametros) throws PersistenciaException;
	 
	 List<T> filtrarPorHqlAndParams(String hql, Map<String, Object> parametros) throws PersistenciaException;
	 
	 EntityTransaction getTransaction() throws PersistenciaException;
	 
	 List<T> listarHql(String hql) throws PersistenciaException;
}
