package br.net.walltec.api.entidades;

import br.net.walltec.api.entidades.comum.EntidadeBasica;

import javax.persistence.*;
import java.util.Date;
@SuppressWarnings("serial")
@Entity
@Table(name="parcela_utilizacao")
public class ParcelaUtilizacao extends EntidadeBasica<ParcelaUtilizacao> {

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name="co_utilizacao")
	private Integer id;
	
	@ManyToOne
	@JoinColumn(name="co_parcela")
	private Lancamento lancamento;
	
	@Temporal(TemporalType.DATE)
	@Column(name="dt_utilizacao")
	private Date dataUtilizacao;
	
	@Column(name="va_utilizacao")
	private Double valor;
	
	@Column(name="no_descricao")
	private String descricao;

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public Lancamento getLancamento() {
		return lancamento;
	}

	public void setLancamento(Lancamento lancamento) {
		this.lancamento = lancamento;
	}

	public Date getDataUtilizacao() {
		return dataUtilizacao;
	}

	public void setDataUtilizacao(Date dataUtilizacao) {
		this.dataUtilizacao = dataUtilizacao;
	}

	public Double getValor() {
		return valor;
	}

	public void setValor(Double valor) {
		this.valor = valor;
	}

	public String getDescricao() {
		return descricao;
	}

	public void setDescricao(String descricao) {
		this.descricao = descricao;
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
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		ParcelaUtilizacao other = (ParcelaUtilizacao) obj;
		if (id == null) {
			if (other.id != null)
				return false;
		} else if (!id.equals(other.id))
			return false;
		return true;
	}
	
	
	
	
}
