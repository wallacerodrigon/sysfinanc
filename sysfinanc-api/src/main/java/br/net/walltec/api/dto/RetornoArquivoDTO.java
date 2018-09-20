/**
 * 
 */
package br.net.walltec.api.dto;

import java.util.List;

/**
 * @author tr301222
 *
 */
public class RetornoArquivoDTO extends DtoPadrao {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	private int mes;
	private int ano;
	private boolean mesEstaFechado;
	private List<RegistroExtratoDto> dadosArquivo;
	/**
	 * @return the mes
	 */
	public int getMes() {
		return mes;
	}
	/**
	 * @param mes the mes to set
	 */
	public void setMes(int mes) {
		this.mes = mes;
	}
	/**
	 * @return the ano
	 */
	public int getAno() {
		return ano;
	}
	/**
	 * @param ano the ano to set
	 */
	public void setAno(int ano) {
		this.ano = ano;
	}
	/**
	 * @return the mesEstaFechado
	 */
	public boolean isMesEstaFechado() {
		return mesEstaFechado;
	}
	/**
	 * @param mesEstaFechado the mesEstaFechado to set
	 */
	public void setMesEstaFechado(boolean mesEstaFechado) {
		this.mesEstaFechado = mesEstaFechado;
	}
	/**
	 * @return the dadosArquivo
	 */
	public List<RegistroExtratoDto> getDadosArquivo() {
		return dadosArquivo;
	}
	/**
	 * @param dadosArquivo the dadosArquivo to set
	 */
	public void setDadosArquivo(List<RegistroExtratoDto> dadosArquivo) {
		this.dadosArquivo = dadosArquivo;
	}
	
	
	
}
