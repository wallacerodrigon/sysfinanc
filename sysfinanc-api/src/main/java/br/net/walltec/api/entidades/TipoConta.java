package br.net.walltec.api.entidades;

import javax.persistence.Cacheable;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import br.net.walltec.api.entidades.comum.EntidadeBasica;
@Entity
@Table(name="tipoconta")
//@Cacheable
//@Cache(usage=CacheConcurrencyStrategy.READ_ONLY)
public class TipoConta extends EntidadeBasica<TipoConta> {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name="co_tipoConta")
	private Integer id;
	
	@Column(name="no_descricao")
	private String descricao;

	@ManyToOne
	@JoinColumn(name="co_usuario")
	private Usuario usuario;
	

	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public String getDescricao() {
		return descricao;
	}
	public void setDescricao(String descricao) {
		this.descricao = descricao;
	}
	public Usuario getUsuario() {
		return usuario;
	}
	public void setUsuario(Usuario usuario) {
		this.usuario = usuario;
	}
	
	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((id == null) ? 0 : id.hashCode());
		return result;
	}
	@Override
	public boolean equals(Object obj) {
		if (this == obj) {
			return true;
		}
		if (obj == null) {
			return false;
		}
		if (!(obj instanceof TipoConta)) {
			return false;
		}
		TipoConta other = (TipoConta) obj;
		if (id == null) {
			if (other.id != null) {
				return false;
			}
		} else if (!id.equals(other.id)) {
			return false;
		}
		return true;
	}
	@Override
	public String toString() {
		return String.format("TipoConta [id=%s, descricao=%s]", id, descricao);
	}
	 
	
	
}
 
