/**
 * 
 */
package br.net.walltec.api.validadores;

import java.io.Serializable;
import java.util.Set;

import javax.validation.ConstraintViolation;
import javax.validation.Validation;
import javax.validation.Validator;

import br.net.walltec.api.excecoes.NegocioException;

/**
 * Valida os dados de entrada usando o bean validator da especificação
 * @author wallace
 *
 */
public final class ValidadorDados {
	
	private static final Validator validator = Validation.buildDefaultValidatorFactory().getValidator();
	
	/**
	 * @param dto
	 * @throws NegocioException
	 */
	public static void validarDadosEntrada(Serializable dto) throws NegocioException {
		Set<ConstraintViolation<Serializable>> validacoes = validator.validate(dto);
		StringBuilder builder = new StringBuilder();
		validacoes.forEach(v -> builder.append(v.getMessage()).append(";"));
		if (!builder.toString().isEmpty()) {
			throw new NegocioException(builder.toString());
		}
	}
	
}
