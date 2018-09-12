/**
 * 
 */
package br.net.walltec.api.entidades;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import br.net.walltec.api.entidades.comum.EntidadeBasica;

/**
 * @author tr301222
 *
 */

@Entity
@Table(name="fechamentocontabil")
public class FechamentoContabil  extends EntidadeBasica<FechamentoContabil> {
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name="co_fechamento")
	private Integer idFechamento;
	
	@Column(name="dt_fechamento")
	private Date dataFechamento;
	
	@Column(name="nu_ano")
	private Integer numAno;
	
	@Column(name="nu_mes")
	private Integer numMes;

	/**
	 * @return the idFechamento
	 */
	public Integer getIdFechamento() {
		return idFechamento;
	}

	/**
	 * @param idFechamento the idFechamento to set
	 */
	public void setIdFechamento(Integer idFechamento) {
		this.idFechamento = idFechamento;
	}

	/**
	 * @return the dataFechamento
	 */
	public Date getDataFechamento() {
		return dataFechamento;
	}

	/**
	 * @param dataFechamento the dataFechamento to set
	 */
	public void setDataFechamento(Date dataFechamento) {
		this.dataFechamento = dataFechamento;
	}

	/**
	 * @return the numAno
	 */
	public Integer getNumAno() {
		return numAno;
	}

	/**
	 * @param numAno the numAno to set
	 */
	public void setNumAno(Integer numAno) {
		this.numAno = numAno;
	}

	/**
	 * @return the numMes
	 */
	public Integer getNumMes() {
		return numMes;
	}

	/**
	 * @param numMes the numMes to set
	 */
	public void setNumMes(Integer numMes) {
		this.numMes = numMes;
	}

	/* (non-Javadoc)
	 * @see java.lang.Object#hashCode()
	 */
	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((idFechamento == null) ? 0 : idFechamento.hashCode());
		return result;
	}

	/* (non-Javadoc)
	 * @see java.lang.Object#equals(java.lang.Object)
	 */
	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		FechamentoContabil other = (FechamentoContabil) obj;
		if (idFechamento == null) {
			if (other.idFechamento != null)
				return false;
		} else if (!idFechamento.equals(other.idFechamento))
			return false;
		return true;
	}
	
	
	
}
