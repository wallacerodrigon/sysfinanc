package br.net.walltec.api.negocio.servicos.comum;


import java.io.Serializable;
import java.util.List;

import br.net.walltec.api.excecoes.NegocioException;
import br.net.walltec.api.vo.GerenciadorPadraoVO;


 /**
  * Interface padrao para os cruds do sistema
 * @author wallace
 *
 * @param <T>
 * @param <V>
 */
public interface CrudPadraoServico<T, V extends GerenciadorPadraoVO> {

	 void incluir(T objeto) throws NegocioException;
	 
	 void alterar(T objeto) throws NegocioException;
	 
	 void excluir(Serializable id) throws NegocioException;
	 
	 T find(Serializable id) throws NegocioException;

	 V incluirVO(V objeto) throws NegocioException;
	 
	 void incluirVO(List<V> objetos) throws NegocioException; 	 
	 
	 V alterarVO(V objeto) throws NegocioException;
	 
	 void alterar(List<T> objetos) throws NegocioException;
	 
	 V buscar(Serializable id) throws NegocioException;

	 V pesquisar(V filtro) throws NegocioException;
	 
	 List<V> listar(V objetoFiltro) throws NegocioException;	
	 
	 List<V> listarTudo(int pagina) throws NegocioException;	
}
