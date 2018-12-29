package br.net.walltec.api.enums;

public enum EnumClassificacaoConta {

	DESPESA("DESP"), 
	RECEITA("REC"), 
	APAGAR("DAP"), 
	PAGO("DPG"), 
	ARECEBER("RAR"), 
	RECEBIDO("RR"),
	NAO_CONCILIADA("NAO_CONC"),
	CONCILIADA("CONC");
	
	private String tipo;
	private EnumClassificacaoConta(String tipo){
		this.tipo = tipo;
	}
	
	public String getTipo() {
		return tipo;
	}
}
