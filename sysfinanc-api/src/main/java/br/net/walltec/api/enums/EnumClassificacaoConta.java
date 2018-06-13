package br.net.walltec.api.enums;

public enum EnumClassificacaoConta {

	DESPESA("D"), RECEITA("R");
	
	private String tipo;
	private EnumClassificacaoConta(String tipo){
		this.tipo = tipo;
	}
	
	public String getTipo() {
		return tipo;
	}
}
