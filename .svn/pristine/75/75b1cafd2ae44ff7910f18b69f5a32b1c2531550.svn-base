package br.net.walltec.api.dto;

import java.io.Serializable;
import java.util.HashMap;
import java.util.Map;

import br.net.walltec.api.utilitarios.Constantes;

public abstract class DtoPadrao implements Serializable {

	private static final long serialVersionUID = 1L;

	private Map<String, Object> dados = new HashMap<String, Object>();
	private Integer qtdRegistros = 0;
	private Integer pagina = 1;
	private Integer qtdRegistrosPorPagina = Constantes.QTD_REGISTROS_PAGINA;
	
	public Map<String, Object> getDados() {
		return dados;
	}
	public void setDados(Map<String, Object> dados) {
		this.dados = dados;
	}
	public Integer getQtdRegistros() {
		return qtdRegistros;
	}
	public void setQtdRegistros(Integer qtdRegistros) {
		this.qtdRegistros = qtdRegistros;
	}
	public Integer getPagina() {
		return pagina;
	}
	public void setPagina(Integer pagina) {
		this.pagina = pagina;
	}
	public Integer getQtdRegistrosPorPagina() {
		return qtdRegistrosPorPagina;
	}
	public void setQtdRegistrosPorPagina(Integer qtdRegistrosPorPagina) {
		this.qtdRegistrosPorPagina = qtdRegistrosPorPagina;
	}
	
}
