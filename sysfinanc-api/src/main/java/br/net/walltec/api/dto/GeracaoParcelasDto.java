/**
 * 
 */
package br.net.walltec.api.dto;

import java.math.BigDecimal;
import java.util.Date;


import br.net.walltec.api.vo.UsuarioVO;

/**
 * @author Wallace
 *
 */
public class GeracaoParcelasDto extends DtoPadrao {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	private Integer idConta;
	private Integer quantidade;
	private String dataVencimentoStr;
	private BigDecimal valorVencimento;
	private Integer idParcelaOrigem;
	private Boolean parcial;
	private Integer idUsuario;
	private String descricaoParcela;
	private int numLancOrigem;
	private boolean despesa;
	/**
	 * @return the quantidade
	 */
	public Integer getQuantidade() {
		return quantidade;
	}
	/**
	 * @param quantidade the quantidade to set
	 */
	public void setQuantidade(Integer quantidade) {
		this.quantidade = quantidade;
	}
	/**
	 * @return the dataVencimentoStr
	 */
	public String getDataVencimentoStr() {
		return dataVencimentoStr;
	}
	/**
	 * @param dataVencimentoStr the dataVencimentoStr to set
	 */
	public void setDataVencimentoStr(String dataVencimentoStr) {
		this.dataVencimentoStr = dataVencimentoStr;
	}
	/**
	 * @return the valorVencimento
	 */
	public BigDecimal getValorVencimento() {
		return valorVencimento;
	}
	/**
	 * @param valorVencimento the valorVencimento to set
	 */
	public void setValorVencimento(BigDecimal valorVencimento) {
		this.valorVencimento = valorVencimento;
	}
	/**
	 * @return the idParcelaOrigem
	 */
	public Integer getIdParcelaOrigem() {
		return idParcelaOrigem;
	}
	/**
	 * @param idParcelaOrigem the idParcelaOrigem to set
	 */
	public void setIdParcelaOrigem(Integer idParcelaOrigem) {
		this.idParcelaOrigem = idParcelaOrigem;
	}
	/**
	 * @return the parcial
	 */
	public Boolean getParcial() {
		return parcial;
	}
	/**
	 * @param parcial the parcial to set
	 */
	public void setParcial(Boolean parcial) {
		this.parcial = parcial;
	}
	/**
	 * @return the idUsuario
	 */
	public Integer getIdUsuario() {
		return idUsuario;
	}
	/**
	 * @param idUsuario the idUsuario to set
	 */
	public void setIdUsuario(Integer idUsuario) {
		this.idUsuario = idUsuario;
	}
	/**
	 * @return the descricaoParcela
	 */
	public String getDescricaoParcela() {
		return descricaoParcela;
	}
	/**
	 * @param descricaoParcela the descricaoParcela to set
	 */
	public void setDescricaoParcela(String descricaoParcela) {
		this.descricaoParcela = descricaoParcela;
	}
	/**
	 * @return the idConta
	 */
	public Integer getIdConta() {
		return idConta;
	}
	/**
	 * @param idConta the idConta to set
	 */
	public void setIdConta(Integer idConta) {
		this.idConta = idConta;
	}
	/**
	 * @return the numLancOrigem
	 */
	public int getNumLancOrigem() {
		return numLancOrigem;
	}
	/**
	 * @param numLancOrigem the numLancOrigem to set
	 */
	public void setNumLancOrigem(int numLancOrigem) {
		this.numLancOrigem = numLancOrigem;
	}
	/**
	 * @return the despesa
	 */
	public boolean isDespesa() {
		return despesa;
	}
	/**
	 * @param despesa the despesa to set
	 */
	public void setDespesa(boolean despesa) {
		this.despesa = despesa;
	}
	
	
}
