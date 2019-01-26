/**
 * 
 */
package br.net.walltec.api.rest.dto;

import java.io.Serializable;

/**
 * @author wallace
 *
 */
public class AlteracaoLancamentoDTO implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	private Integer idLancamento;
	private String dataVencimento;
	private Double valor;
	private String numDocumento;
	private Integer idFormaPagamento;
	private String descricao;
	private boolean bolPago;
	
	public Integer getIdLancamento() {
		return idLancamento;
	}
	public void setIdLancamento(Integer idLancamento) {
		this.idLancamento = idLancamento;
	}
	public String getDataVencimento() {
		return dataVencimento;
	}
	public void setDataVencimento(String dataVencimento) {
		this.dataVencimento = dataVencimento;
	}
	public Double getValor() {
		return valor;
	}
	public void setValor(Double valor) {
		this.valor = valor;
	}
	public String getNumDocumento() {
		return numDocumento;
	}
	public void setNumDocumento(String numDocumento) {
		this.numDocumento = numDocumento;
	}
	public Integer getIdFormaPagamento() {
		return idFormaPagamento;
	}
	public void setIdFormaPagamento(Integer idFormaPagamento) {
		this.idFormaPagamento = idFormaPagamento;
	}
	public String getDescricao() {
		return descricao;
	}
	public void setDescricao(String descricao) {
		this.descricao = descricao;
	}
	public boolean isBolPago() {
		return bolPago;
	}
	public void setBolPago(boolean bolPago) {
		this.bolPago = bolPago;
	}
	
	
}
