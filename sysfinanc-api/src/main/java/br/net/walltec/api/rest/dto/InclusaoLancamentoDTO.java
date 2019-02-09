/**
 * 
 */
package br.net.walltec.api.rest.dto;

import java.io.Serializable;

import javax.validation.constraints.NotNull;

/**
 * @author wallace
 *
 */
public class InclusaoLancamentoDTO implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	@NotNull(message="Id da rubrica é obrigatória")
	private Integer idRubrica;
	
	@NotNull(message="Id da forma de pagamento é obrigatória")
	private Integer idFormaPagamento;
	
	@NotNull(message="Descrição é obrigatória")
	private String descricao;
	private boolean bolPaga;
	
	@NotNull(message="Data de vencimento é obrigatória")
	private String dataVencimento;

	@NotNull(message="Valor é obrigatório")
	private Double valor;

	private String numDocumento;
	
	private boolean bolRepete;
	private String dataFimRepeticao;
	
	public Integer getIdRubrica() {
		return idRubrica;
	}
	public void setIdRubrica(Integer idRubrica) {
		this.idRubrica = idRubrica;
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
	public boolean isBolPaga() {
		return bolPaga;
	}
	public void setBolPaga(boolean bolPaga) {
		this.bolPaga = bolPaga;
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
	public boolean isBolRepete() {
		return bolRepete;
	}
	public void setBolRepete(boolean bolRepete) {
		this.bolRepete = bolRepete;
	}
	public String getDataFimRepeticao() {
		return dataFimRepeticao;
	}
	public void setDataFimRepeticao(String dataFimRepeticao) {
		this.dataFimRepeticao = dataFimRepeticao;
	}
	
	
	
	
}
