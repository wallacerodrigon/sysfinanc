package br.net.walltec.api.entidades;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.persistence.Transient;

import br.net.walltec.api.entidades.comum.EntidadeBasica;
import br.net.walltec.api.enums.EnumClassificacaoConta;
import br.net.walltec.api.utilitarios.Constantes;
import br.net.walltec.api.utilitarios.UtilData;

@Entity
@Table(name="lancamento")
public class Lancamento extends EntidadeBasica<Lancamento> {
	
	
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name="co_parcela")
	private Integer id;
	
	@Column(name="nu_parcela")	
	private Short numero;
	 
	@Temporal(TemporalType.DATE)
	@Column(name="dt_vencimento")
	private Date dataVencimento;
	 
	@ManyToOne(fetch=FetchType.EAGER)
	@JoinColumn(name="co_conta")	
	private Conta conta;
	 
	@Column(name="va_parcela")	
	private BigDecimal valor;
	 
	//montar um flyweight neste objeto
	@ManyToOne(fetch=FetchType.EAGER)
	@JoinColumn(name="co_formapagamento")	
	private FormaPagamento formaPagamento;
	 
	@ManyToOne(fetch=FetchType.EAGER)
	@JoinColumn(name="co_parcelaOrigem", nullable=true)	
	private Lancamento lancamentoOrigem;
	
	@Column(name="no_descricao")
	private String descricao;

	private Boolean bolPaga;

	@OneToMany(mappedBy="lancamento")
	private List<ParcelaUtilizacao> listaUtilizacao;
	
	private Boolean bolConciliado;
	
	private String numDocumento;

	@Transient
	private String descStatus;

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public Short getNumero() {
		return numero;
	}

	public void setNumero(Short numero) {
		this.numero = numero;
	}

	public Date getDataVencimento() {
		return dataVencimento;
	}

	public void setDataVencimento(Date dataVencimento) {
		this.dataVencimento = dataVencimento;
	}

	public Conta getConta() {
		return conta;
	}

	public void setConta(Conta conta) {
		this.conta = conta;
	}

	public BigDecimal getValor() {
		return valor;
	}

	public void setValor(BigDecimal valor) {
		this.valor = valor;
	}

	public FormaPagamento getFormaPagamento() {
		return formaPagamento;
	}

	public void setFormaPagamento(FormaPagamento formaPagamento) {
		this.formaPagamento = formaPagamento;
	}

	public Lancamento getLancamentoOrigem() {
		return lancamentoOrigem;
	}

	public void setLancamentoOrigem(Lancamento lancamentoOrigem) {
		this.lancamentoOrigem = lancamentoOrigem;
	}

	public String getDescricao() {
		return descricao;
	}

	public void setDescricao(String descricao) {
		this.descricao = descricao;
	}

	public Boolean getBolPaga() {
		return bolPaga;
	}

	public void setBolPaga(Boolean bolPaga) {
		this.bolPaga = bolPaga;
	}

	public List<ParcelaUtilizacao> getListaUtilizacao() {
		return listaUtilizacao;
	}

	public void setListaUtilizacao(List<ParcelaUtilizacao> listaUtilizacao) {
		this.listaUtilizacao = listaUtilizacao;
	}

	public Boolean getBolConciliado() {
		return bolConciliado;
	}

	public void setBolConciliado(Boolean bolConciliado) {
		this.bolConciliado = bolConciliado;
	}

	public String getNumDocumento() {
		return numDocumento;
	}

	public void setNumDocumento(String numDocumento) {
		this.numDocumento = numDocumento;
	}
	
	public boolean getDespesa() {
		return this.conta.getDespesa();
	}
	
	public boolean isDespesa() {
		return this.conta != null && this.conta.getDespesa();
	}
	
	public boolean isReceita() {
		return this.conta != null && !this.conta.getDespesa();
	}
	
	public String getMesAno() {
		return this.getDataVencimento() != null ? 
						UtilData.getMes(this.getDataVencimento())+"/"+UtilData.getAno(this.dataVencimento) : null;
	}
	
	public Double getValorEmDouble() {
		return this.getValor() != null ? this.getValor().doubleValue() : 0.00;
	}
	
	public String getDescConta() {
		return this.conta != null && this.conta.getDescricao() != null ? this.conta.getDescricao() : null;
	}
	
	public TipoConta getTipoConta() {
		return this.conta != null ? this.conta.getTipoConta() : null;
	}
	
	public Integer getIdLancamentoOrigem() {
		return this.getLancamentoOrigem() != null && !this.getLancamentoOrigem().getId().equals(this.id) ? this.getLancamentoOrigem().getId() : 0;
	}

	/* (non-Javadoc)
	 * @see java.lang.Object#hashCode()
	 */
	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((id == null) ? 0 : id.hashCode());
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
		Lancamento other = (Lancamento) obj;
		if (id == null) {
			if (other.id != null)
				return false;
		} else if (!id.equals(other.id))
			return false;
		return true;
	}

	public String getDescStatus() {
		return descStatus;
	}

	public void setDescStatus(String descStatus) {
		this.descStatus = descStatus;
	}
	
	public void addStatus(EnumClassificacaoConta enumClassificacao) {
		if (this.getDescStatus() == null) {
			this.setDescStatus("");
		}
		this.setDescStatus(this.getDescStatus() + Constantes.SEPARADOR_STATUS + enumClassificacao.getTipo());
	}
}
 
