/**
 * 
 */
package br.net.walltec.api.dto;

import java.io.Serializable;
import java.math.BigDecimal;

/**
 * @author wallace
 *
 */
public class TipoContaNoMesDTO implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	private String nomeTipoConta;
	
	private BigDecimal valor;
	
	

	/**
	 * @param nomeTipoConta
	 * @param descMes
	 * @param valor
	 */
	public TipoContaNoMesDTO(String nomeTipoConta, BigDecimal valor) {
		super();
		this.nomeTipoConta = nomeTipoConta;
		this.valor = valor;
	}

	/**
	 * @return the nomeTipoConta
	 */
	public String getNomeTipoConta() {
		return nomeTipoConta;
	}

	/**
	 * @param nomeTipoConta the nomeTipoConta to set
	 */
	public void setNomeTipoConta(String nomeTipoConta) {
		this.nomeTipoConta = nomeTipoConta;
	}

	/**
	 * @return the valor
	 */
	public BigDecimal getValor() {
		return valor;
	}

	/**
	 * @param valor the valor to set
	 */
	public void setValor(BigDecimal valor) {
		this.valor = valor;
	}

	
	

	
}
