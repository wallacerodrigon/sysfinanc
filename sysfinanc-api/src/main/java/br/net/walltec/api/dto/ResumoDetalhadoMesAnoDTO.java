/**
 * 
 */
package br.net.walltec.api.dto;

import java.math.BigDecimal;

/**
 * @author tr301222
 *
 */
public class ResumoDetalhadoMesAnoDTO extends ResumoMesAnoDTO {

	private BigDecimal totalRecebido;
	
	private BigDecimal totalReceber;
	
	private BigDecimal totalPago;
	
	private BigDecimal totalPagar;
	
	public ResumoDetalhadoMesAnoDTO(ResumoMesAnoDTO dto) {
		this.setAno(dto.getAno());
		this.setMes(dto.getMes());
		this.setSaldoFinal(dto.getSaldoFinal());
		this.setTotalDespesas(dto.getTotalDespesas());
		this.setTotalReceitas(dto.getTotalReceitas());
	}

	public BigDecimal getTotalRecebido() {
		return totalRecebido;
	}

	public void setTotalRecebido(BigDecimal totalRecebido) {
		this.totalRecebido = totalRecebido;
	}

	public BigDecimal getTotalReceber() {
		return totalReceber;
	}

	public void setTotalReceber(BigDecimal totalReceber) {
		this.totalReceber = totalReceber;
	}

	public BigDecimal getTotalPago() {
		return totalPago;
	}

	public void setTotalPago(BigDecimal totalPago) {
		this.totalPago = totalPago;
	}

	public BigDecimal getTotalPagar() {
		return totalPagar;
	}

	public void setTotalPagar(BigDecimal totalPagar) {
		this.totalPagar = totalPagar;
	}
	
	
	
}
