package br.net.walltec.api.dto;

import java.util.List;
import java.util.stream.Collectors;

import br.net.walltec.api.vo.LancamentoVO;

//verificar como ignorar atributos 
public class RegistroExtratoDto {

    private String dataLancamento;

    private String historico;

    private String documento;

    private String valor;
    
    private String creditoDebito;
    
    private List<LancamentoVO> lancamentos;
    
    private boolean confirmado;
    
    private int[] arrayIds;
    
    private boolean conciliado;
    

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

	/**
	 */
	public Double calcularTotalLancamentos() {
		return getLancamentos()
			 .stream()
			 .collect(Collectors.summingDouble(LancamentoVO::getValor))
			 .doubleValue();
	}

	/**
	 * @return the arrayIds
	 */
	public int[] getArrayIds() {
		return arrayIds;
	}

	/**
	 * @param arrayIds the arrayIds to set
	 */
	public void setArrayIds(int[] arrayIds) {
		this.arrayIds = arrayIds;
	}

	/**
	 * @return the conciliado
	 */
	public boolean isConciliado() {
		return conciliado;
	}

	/**
	 * @param conciliado the conciliado to set
	 */
	public void setConciliado(boolean conciliado) {
		this.conciliado = conciliado;
	}


}
