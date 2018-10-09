/**
 * 
 */
package br.net.walltec.api.dto;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.HashSet;
import java.util.Set;

import br.net.walltec.api.excecoes.NegocioException;

/**
 * @author wallace
 *
 */
public class MapaDashboardDTO implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	private BigDecimal totalEntradas;
	
	private BigDecimal totalSaidas;
	
	private BigDecimal totalPagar;
	
	private BigDecimal totalReceber;
	
	private Set<TipoContaNoMesDTO> tiposContasPorMes = new HashSet<>();

	
	public MapaDashboardDTO comEsseValorDeEntrada(BigDecimal valor) {
		this.totalEntradas = valor;
		return this;
	}
	
	public MapaDashboardDTO comEsseValorDeSaida(BigDecimal valor) {
		this.totalSaidas = valor;
		return this;
	}
	
	public MapaDashboardDTO comEsseValorParaPagar(BigDecimal valor) {
		this.totalPagar = valor;
		return this;
	}
	
	public MapaDashboardDTO comEsseValorParaReceber(BigDecimal valor) {
		this.totalReceber = valor;
		return this;
	}
	
	public MapaDashboardDTO adicioneEssesTiposContasPorMes(Set<TipoContaNoMesDTO> tiposContasPorMes) {
		this.tiposContasPorMes = tiposContasPorMes;
		return this;
	}
	
	public MapaDashboardDTO adicioneEsteTipoContaNoMesDto(TipoContaNoMesDTO dto) {
		tiposContasPorMes.add(dto);
		return this;
	}	
	
	public MapaDashboardDTO monteOMapaDeDashboard() throws NegocioException {
		//valida os dados e se estiver ok, retorna o dto
		return this;
	}

	/**
	 * @return the totalEntradas
	 */
	public BigDecimal getTotalEntradas() {
		return totalEntradas;
	}

	/**
	 * @param totalEntradas the totalEntradas to set
	 */
	public void setTotalEntradas(BigDecimal totalEntradas) {
		this.totalEntradas = totalEntradas;
	}

	/**
	 * @return the totalSaidas
	 */
	public BigDecimal getTotalSaidas() {
		return totalSaidas;
	}

	/**
	 * @param totalSaidas the totalSaidas to set
	 */
	public void setTotalSaidas(BigDecimal totalSaidas) {
		this.totalSaidas = totalSaidas;
	}

	/**
	 * @return the totalPagar
	 */
	public BigDecimal getTotalPagar() {
		return totalPagar;
	}

	/**
	 * @param totalPagar the totalPagar to set
	 */
	public void setTotalPagar(BigDecimal totalPagar) {
		this.totalPagar = totalPagar;
	}

	/**
	 * @return the totalReceber
	 */
	public BigDecimal getTotalReceber() {
		return totalReceber;
	}

	/**
	 * @param totalReceber the totalReceber to set
	 */
	public void setTotalReceber(BigDecimal totalReceber) {
		this.totalReceber = totalReceber;
	}

	/**
	 * @return the tiposContasPorMes
	 */
	public Set<TipoContaNoMesDTO> getTiposContasPorMes() {
		return tiposContasPorMes;
	}

	/**
	 * @param tiposContasPorMes the tiposContasPorMes to set
	 */
	public void setTiposContasPorMes(Set<TipoContaNoMesDTO> tiposContasPorMes) {
		this.tiposContasPorMes = tiposContasPorMes;
	}
	
}
