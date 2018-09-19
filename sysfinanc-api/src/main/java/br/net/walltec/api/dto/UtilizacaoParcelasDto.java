/**
 * 
 */
package br.net.walltec.api.dto;

import java.math.BigDecimal;


/**
 * @author Administrador
 *
 */
public class UtilizacaoParcelasDto extends DtoPadrao {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	private Integer idLancamentoOrigem;
	private BigDecimal valorUtilizado; 
	private String dataUtilizacaoStr;
	private String descricao;
	private Integer idFormaPagamento;
	
	/**
	 * @return the idLancamentoOrigem
	 */
	public Integer getIdLancamentoOrigem() {
		return idLancamentoOrigem;
	}
	/**
	 * @param idLancamentoOrigem the idLancamentoOrigem to set
	 */
	public void setIdLancamentoOrigem(Integer idLancamentoOrigem) {
		this.idLancamentoOrigem = idLancamentoOrigem;
	}
	/**
	 * @return the valorUtilizado
	 */
	public BigDecimal getValorUtilizado() {
		return valorUtilizado;
	}
	/**
	 * @param valorUtilizado the valorUtilizado to set
	 */
	public void setValorUtilizado(BigDecimal valorUtilizado) {
		this.valorUtilizado = valorUtilizado;
	}
	
	/**
	 * @return the descricao
	 */
	public String getDescricao() {
		return descricao;
	}
	/**
	 * @param descricao the descricao to set
	 */
	public void setDescricao(String descricao) {
		this.descricao = descricao;
	}
	/**
	 * @return the dataUtilizacaoStr
	 */
	public String getDataUtilizacaoStr() {
		return dataUtilizacaoStr;
	}
	/**
	 * @param dataUtilizacaoStr the dataUtilizacaoStr to set
	 */
	public void setDataUtilizacaoStr(String dataUtilizacaoStr) {
		this.dataUtilizacaoStr = dataUtilizacaoStr;
	}
	public Integer getIdFormaPagamento() {
		return idFormaPagamento;
	}
	public void setIdFormaPagamento(Integer idFormaPagamento) {
		this.idFormaPagamento = idFormaPagamento;
	}
	
	
	
}
