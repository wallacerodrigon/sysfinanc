package br.net.walltec.api.conversores;


import java.util.List;

/**
 * Interface do conversor padrão
 * @author wallace
 *
 * @param <T>
 * @param <V>
 */
public interface ConversorPadrao<T, V> {

	T converterPojoParaEntidade(V pojo);
	
	V converterEntidadeParaPojo(T entidade);
	
	List<T> converterPojoParaEntidade(List<V> listaPojos);
	
	List<V> converterEntidadeParaPojo(List<T> listaEntidades);
	
	
}
