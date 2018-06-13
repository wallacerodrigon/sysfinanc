/**
 * 
 */
package br.net.walltec.api.vo;

import java.math.BigDecimal;
import java.util.Date;

import br.net.walltec.api.utilitarios.UtilData;
import br.net.walltec.api.utilitarios.UtilFormatador;

/**
 * @author wallace
 *
 */
public class UtilizacaoLancamentoVO extends GerenciadorPadraoVO {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	private Date data;
	private BigDecimal valor;
	private String descricao;
	private Short numeroParcela;
	
	private String dataStr;
	
	private String valorStr;
	
	
	/**
	 * @param data
	 * @param valor
	 * @param descricao
	 */
	public UtilizacaoLancamentoVO(Date data, BigDecimal valor, String descricao, Short numeroParcela) {
		super();
		this.data = data;
		this.valor = valor;
		this.descricao = descricao;
		this.setNumeroParcela(numeroParcela);
		
		this.dataStr = UtilData.getDataFormatada(data);
		this.valorStr = UtilFormatador.formatarDecimal(valor);
	}
	
	public Date getData() {
		return data;
	}
	public void setData(Date data) {
		this.data = data;
	}
	public BigDecimal getValor() {
		return valor;
	}
	public void setValor(BigDecimal valor) {
		this.valor = valor;
	}
	public String getDescricao() {
		return descricao;
	}
	public void setDescricao(String descricao) {
		this.descricao = descricao;
	}

	/**
	 * @return the numeroParcela
	 */
	public Short getNumeroParcela() {
		return numeroParcela;
	}

	/**
	 * @param numeroParcela the numeroParcela to set
	 */
	public void setNumeroParcela(Short numeroParcela) {
		this.numeroParcela = numeroParcela;
	}

	/**
	 * @return the dataStr
	 */
	public String getDataStr() {
		return dataStr;
	}

	/**
	 * @param dataStr the dataStr to set
	 */
	public void setDataStr(String dataStr) {
		this.dataStr = dataStr;
	}

	/**
	 * @return the valorStr
	 */
	public String getValorStr() {
		return valorStr;
	}

	/**
	 * @param valorStr the valorStr to set
	 */
	public void setValorStr(String valorStr) {
		this.valorStr = valorStr;
	}
	
	

}
