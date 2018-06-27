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
public class RubricaMesAnoDTO implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	private String nomeRubrica;
	
	private BigDecimal valorRubrica;

	/**
	 * @return the nomeRubrica
	 */
	public String getNomeRubrica() {
		return nomeRubrica;
	}

	/**
	 * @param nomeRubrica the nomeRubrica to set
	 */
	public void setNomeRubrica(String nomeRubrica) {
		this.nomeRubrica = nomeRubrica;
	}

	/**
	 * @return the valorRubrica
	 */
	public BigDecimal getValorRubrica() {
		return valorRubrica;
	}

	/**
	 * @param valorRubrica the valorRubrica to set
	 */
	public void setValorRubrica(BigDecimal valorRubrica) {
		this.valorRubrica = valorRubrica;
	}

	/* (non-Javadoc)
	 * @see java.lang.Object#hashCode()
	 */
	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((nomeRubrica == null) ? 0 : nomeRubrica.hashCode());
		return result;
	}

	/* (non-Javadoc)
	 * @see java.lang.Object#equals(java.lang.Object)
	 */
	@Override
	public boolean equals(Object obj) {
		if (this == obj) {
			return true;
		}
		if (obj == null) {
			return false;
		}
		if (!(obj instanceof RubricaMesAnoDTO)) {
			return false;
		}
		RubricaMesAnoDTO other = (RubricaMesAnoDTO) obj;
		if (nomeRubrica == null) {
			if (other.nomeRubrica != null) {
				return false;
			}
		} else if (!nomeRubrica.equals(other.nomeRubrica)) {
			return false;
		}
		return true;
	}
	
	

	
}
