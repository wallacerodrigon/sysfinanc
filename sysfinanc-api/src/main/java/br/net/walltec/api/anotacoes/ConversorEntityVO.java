/**
 * 
 */
package br.net.walltec.api.anotacoes;

import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

/**
 * Anotação que contempla os dados da entidade origem para ser convertida para a entidade destino.
 * @author tr301222
 *
 */
@Target(value={java.lang.annotation.ElementType.FIELD})
@Retention(RetentionPolicy.RUNTIME)
public @interface ConversorEntityVO {

	String atributoDestino();
	
	Class<?> classeConversor();
}
