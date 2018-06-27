package br.net.walltec.api.dto;

public class RegistroExtratoDto {

    private String dataLancamento;

    private String historico;

    private String documento;

    private String valor;
    
    private String creditoDebito;

    public String getDataLancamento() {
        return dataLancamento;
    }

    public void setDataLancamento(String dataLancamento) {
        this.dataLancamento = dataLancamento;
    }

    public String getHistorico() {
        return historico;
    }

    public void setHistorico(String historico) {
        this.historico = historico;
    }

    public String getDocumento() {
        return documento;
    }

    public void setDocumento(String documento) {
        this.documento = documento;
    }

    public String getValor() {
        return valor;
    }

    public void setValor(String valor) {
        this.valor = valor;
    }

	/**
	 * @return the creditoDebito
	 */
	public String getCreditoDebito() {
		return creditoDebito;
	}

	/**
	 * @param creditoDebito the creditoDebito to set
	 */
	public void setCreditoDebito(String creditoDebito) {
		this.creditoDebito = creditoDebito;
	}
}
