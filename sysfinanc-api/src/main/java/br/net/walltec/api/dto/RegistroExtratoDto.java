package br.net.walltec.api.dto;

import java.util.List;

import br.net.walltec.api.vo.LancamentoVO;

public class RegistroExtratoDto {

    private String dataLancamento;

    private String historico;

    private String documento;

    private String valor;
    
    private String creditoDebito;
    
    private List<LancamentoVO> lancamentos;
    
    private boolean confirmado;
    

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

	/**
	 * @return the lancamentos
	 */
	public List<LancamentoVO> getLancamentos() {
		return lancamentos;
	}

	/**
	 * @param lancamentos the lancamentos to set
	 */
	public void setLancamentos(List<LancamentoVO> lancamentos) {
		this.lancamentos = lancamentos;
	}

	/**
	 * @return the confirmado
	 */
	public boolean isConfirmado() {
		return confirmado;
	}

	/**
	 * @param confirmado the confirmado to set
	 */
	public void setConfirmado(boolean confirmado) {
		this.confirmado = confirmado;
	}


}
