package br.net.walltec.api.conversores;



import java.lang.reflect.Field;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.ParameterizedType;
import java.util.ArrayList;
import java.util.List;

import org.apache.commons.beanutils.BeanUtils;

import br.net.walltec.api.anotacoes.ConversorEntityVO;
import br.net.walltec.api.converters.Converters;

/**
 * @author wallace
 *
 */
public abstract class AbstractConverter<T, V> implements ConversorPadrao<T, V>  {


	/** Converte uma lista de pojos para uma lista de entidades
	 * @see br.net.walltec.converters.interfaces.ConversorPadrao#converterPojoParaEntidade(java.util.List)
	 */
	@Override
	public List<T> converterPojoParaEntidade(List<V> listaPojos) {
		List<T> lista = new ArrayList<T>();
		if (listaPojos != null){
			for(V vo : listaPojos){
				lista.add(converterPojoParaEntidade(vo));
			}
		}
		return lista;
	
	}

	@Override
	public List<V> converterEntidadeParaPojo(List<T> listaEntidades) {
		List<V> lista = new ArrayList<V>();
		if (listaEntidades != null){
			listaEntidades.stream().forEach( obj -> {
				lista.add(converterEntidadeParaPojo(obj));
			});
		}
		return lista;
	}
	
	@SuppressWarnings("unchecked")
	@Override
	public T converterPojoParaEntidade(V pojo) {
		T objDestino = (T)obterNovaInstancia(0);
		copiarPropriedadesSemelhantes(pojo,  objDestino);
		return objDestino;
	}

	private Object obterNovaInstancia(int indice) {
		Class<?> classeEntidade = (Class<?>) ((ParameterizedType)getClass().getGenericSuperclass()).getActualTypeArguments()[indice];
		Object objDestino = null;
		try {
			objDestino = classeEntidade.newInstance();
		} catch (InstantiationException | IllegalAccessException e) {
			e.printStackTrace();
		}
		return objDestino;
	}

	@Override
	@SuppressWarnings("unchecked")
	public V converterEntidadeParaPojo(T entidade) {
		V objDestino = (V)obterNovaInstancia(1);
		copiarPropriedadesSemelhantes(entidade, objDestino);
		//copiarPropriedadesDiferentes(entidade, objDestino);
		return objDestino;
	}
	
	private void copiarPropriedadesSemelhantes(Object objetoOrigem, Object objetoDestino){
		try {
			BeanUtils.copyProperties(objetoDestino, objetoOrigem);
		} catch (IllegalAccessException | InvocationTargetException e) {
			e.printStackTrace();
		} catch(Exception e) {
			e.printStackTrace();
		}
		
	}
	
	private void copiarPropriedadesDiferentes(Object objetoOrigem, Object objetoDestino){
		
		Field[] atributos = objetoOrigem.getClass().getDeclaredFields();
		
		for(Field atributo : atributos){
			if (atributo.isAnnotationPresent(ConversorEntityVO.class)){
				String nomeDestino = atributo.getAnnotation(ConversorEntityVO.class).atributoDestino();
				Class<?> classeConversor = atributo.getAnnotation(ConversorEntityVO.class).classeConversor();
				
				copiarAtributo(objetoOrigem, objetoDestino, atributo, nomeDestino, classeConversor);
			}
		}
		
	}

	/**
	 * @param objetoOrigem
	 * @param atributo
	 * @param nomeDestino
	 * @param classeConversor 
	 */
	private void copiarAtributo(Object objetoOrigem, Object objetoDestino, Field atributo,
			String nomeDestino, Class<?> classeConversor) {
		try {
			if (classeConversor != null){
				Converters conversor = (Converters) classeConversor.newInstance();
				Object dadoOrigem = null; //BeanUtils.getArrayProperty(bean, name); getProperty(bean, name) (objetoOrigem, atributo.getName());
				Object novoDado = conversor.converter(dadoOrigem);
				BeanUtils.setProperty(objetoDestino, nomeDestino, novoDado);
			} else {
				BeanUtils.copyProperty(objetoOrigem, atributo.getName(), nomeDestino);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
	}	
	
	
}
