package br.net.walltec.api.enums;

public enum EnumSituacaoLancamento {

	DESPESA_NAO_PAGA("dnp"), 
	DESPESA_PAGA("dpg"),
	RECEITA_NAO_PAGA("rnp"), 
	RECEITA_PAGA("rpg"),
	TOTAL_RECEITA("ttr"), 
	TOTAL_DESPESA("ttd"),
	SALDO_PAGO("spg"), 
	SALDO_NAO_PAGO("snp"),
	SALDO_GERAL("sgl");
	
	private String sigla;
	
	private EnumSituacaoLancamento(String sigla){
		this.setSigla(sigla);
		
	}

	public String getSigla() {
		return sigla;
	}

	public void setSigla(String sigla) {
		this.sigla = sigla;
	}

}
