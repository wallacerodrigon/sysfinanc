package br.net.walltec.api.entidades;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import br.net.walltec.api.entidades.comum.EntidadeBasica;
@Entity
@Table(name="usuario")
//@Cache(usage=CacheConcurrencyStrategy.READ_ONLY)
public class Usuario extends EntidadeBasica<Usuario> {
 
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	@Id
	@Column(name="co_usuario")
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Integer id;
	
	@Column(name="no_usuario", nullable=false)
	private String nome;
	
	@Column(name="no_senha", nullable=false, length=6)	
	private String senha;

	@Column(name="no_login", nullable=false, length=6)	
	private String login;
	
	
	@Column(name="email")	
	private String email;
	
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name="dt_inclusao", nullable=false)	
	private Date dataInclusao;
	
	@Column(name="dt_ultimoAcesso")	
	private Date dataUltimoAcesso;
	
	@Column(name="dt_alteracao", nullable=true)	
	private Date dataAlteracao;
	
	@Column(name="qt_acessos")	
	private Integer qtdAcessos;

	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public String getNome() {
		return nome;
	}
	public void setNome(String nome) {
		this.nome = nome;
	}
	public String getSenha() {
		return senha;
	}
	public void setSenha(String senha) {
		this.senha = senha;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public Date getDataInclusao() {
		return dataInclusao;
	}
	public void setDataInclusao(Date dataInclusao) {
		this.dataInclusao = dataInclusao;
	}
	public Date getDataUltimoAcesso() {
		return dataUltimoAcesso;
	}
	public void setDataUltimoAcesso(Date dataUltimoAcesso) {
		this.dataUltimoAcesso = dataUltimoAcesso;
	}
	public Date getDataAlteracao() {
		return dataAlteracao;
	}
	public void setDataAlteracao(Date dataAlteracao) {
		this.dataAlteracao = dataAlteracao;
	}
	public Integer getQtdAcessos() {
		return qtdAcessos;
	}
	public void setQtdAcessos(Integer qtdAcessos) {
		this.qtdAcessos = qtdAcessos;
	}
	public String getLogin() {
		return login;
	}
	public void setLogin(String login) {
		this.login = login;
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
		if (!(obj instanceof Usuario)) {
			return false;
		}
		Usuario other = (Usuario) obj;
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
		return String.format("Usuario [id=%s, nome=%s, login=%s]", id, nome, login);
	}

}
 
