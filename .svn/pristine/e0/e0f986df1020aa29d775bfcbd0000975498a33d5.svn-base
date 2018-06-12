package br.net.walltec.api.entidades;

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
@Table(name="formapagamento")
@Cache(usage=CacheConcurrencyStrategy.READ_ONLY)
public class FormaPagamento extends EntidadeBasica<FormaPagamento> {
 
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name="co_formapagamento")
	private Integer id;
	
	@Column(name="no_formapagamento")	
	private String descricao;
	 
	@Column(name="ln_privado", nullable=false)	
	private Boolean privado;
	 
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

	public Boolean getPrivado() {
		return privado;
	}

	public void setPrivado(Boolean privado) {
		this.privado = privado;
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
		if (!(obj instanceof FormaPagamento)) {
			return false;
		}
		FormaPagamento other = (FormaPagamento) obj;
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
		return String.format(
				"FormaPagamento [id=%s, descricao=%s, privado=%s, usuario=%s]",
				id, descricao, privado, usuario);
	}
	 
}
 
