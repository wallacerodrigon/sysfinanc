package br.net.walltec.api.vo;

import java.util.List;

public class LancamentoVO extends GerenciadorPadraoVO {

	/**
	 * 
	 */
 
	private Integer id;

	private Short numero;

	private String dataVencimentoStr;
	
	private String dataFimStr;

	private Integer idConta;

	private String descConta;

	private Double valor;

	private String valorCreditoStr;
	
	private String valorDebitoStr;

	private Integer idParcelaOrigem;

	private String descricao;

	private boolean bolPaga;

	private boolean bolConciliado;

	private String numDocumento;
	
	private boolean despesa;
	
	private Integer idFormaPagamento;
	
	private String descFormaPagamento;
	
	private List<LancamentoVO> lancamentosUtilizados;

	private String descStatus;
	
    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Short getNumero() {
        return numero;
    }

    public void setNumero(Short numero) {
        this.numero = numero;
    }

    public String getDataVencimentoStr() {
        return dataVencimentoStr;
    }

    public void setDataVencimentoStr(String dataVencimentoStr) {
        this.dataVencimentoStr = dataVencimentoStr;
    }

    public Integer getIdConta() {
        return idConta;
    }

    public void setIdConta(Integer idConta) {
        this.idConta = idConta;
    }

    public String getDescConta() {
        return descConta;
    }

    public void setDescConta(String descConta) {
        this.descConta = descConta;
    }

    public Double getValor() {
        return valor;
    }

    public void setValor(Double valor) {
        this.valor = valor;
    }

  
    public Integer getIdParcelaOrigem() {
        return idParcelaOrigem;
    }

    public void setIdParcelaOrigem(Integer idParcelaOrigem) {
        this.idParcelaOrigem = idParcelaOrigem;
    }

    public String getDescricao() {
        return descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }


    public boolean isBolPaga() {
        return bolPaga;
    }

    public void setBolPaga(boolean bolPaga) {
        this.bolPaga = bolPaga;
    }

    public boolean isBolConciliado() {
        return bolConciliado;
    }

    public void setBolConciliado(boolean bolConciliado) {
        this.bolConciliado = bolConciliado;
    }

    public String getNumDocumento() {
        return numDocumento;
    }

    public void setNumDocumento(String numDocumento) {
        this.numDocumento = numDocumento;
    }

	/**
	 * @return the valorCreditoStr
	 */
	public String getValorCreditoStr() {
		return valorCreditoStr;
	}

	/**
	 * @param valorCreditoStr the valorCreditoStr to set
	 */
	public void setValorCreditoStr(String valorCreditoStr) {
		this.valorCreditoStr = valorCreditoStr;
	}

	/**
	 * @return the valorDebitoStr
	 */
	public String getValorDebitoStr() {
		return valorDebitoStr;
	}

	/**
	 * @param valorDebitoStr the valorDebitoStr to set
	 */
	public void setValorDebitoStr(String valorDebitoStr) {
		this.valorDebitoStr = valorDebitoStr;
	}

	/**
	 * @return the despesa
	 */
	public boolean isDespesa() {
		return despesa;
	}

	/**
	 * @param despesa the despesa to set
	 */
	public void setDespesa(boolean despesa) {
		this.despesa = despesa;
	}

	/**
	 * @return the dataFimStr
	 */
	public String getDataFimStr() {
		return dataFimStr;
	}

	/**
	 * @param dataFimStr the dataFimStr to set
	 */
	public void setDataFimStr(String dataFimStr) {
		this.dataFimStr = dataFimStr;
	}

	/* (non-Javadoc)
	 * @see java.lang.Object#hashCode()
	 */
	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((id == null) ? 0 : id.hashCode());
		return result;
	}

	/* (non-Javadoc)
	 * @see java.lang.Object#equals(java.lang.Object)
	 */
	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		LancamentoVO other = (LancamentoVO) obj;
		if (id == null) {
			if (other.id != null)
				return false;
		} else if (!id.equals(other.id))
			return false;
		return true;
	}

	public Integer getIdFormaPagamento() {
		return idFormaPagamento;
	}

	public void setIdFormaPagamento(Integer idFormaPagamento) {
		this.idFormaPagamento = idFormaPagamento;
	}

	public String getDescFormaPagamento() {
		return descFormaPagamento;
	}

	public void setDescFormaPagamento(String descFormaPagamento) {
		this.descFormaPagamento = descFormaPagamento;
	}

	public List<LancamentoVO> getLancamentosUtilizados() {
		return lancamentosUtilizados;
	}

	public void setLancamentosUtilizados(List<LancamentoVO> lancamentosUtilizados) {
		this.lancamentosUtilizados = lancamentosUtilizados;
	}

	public String getDescStatus() {
		return descStatus;
	}

	public void setDescStatus(String descStatus) {
		this.descStatus = descStatus;
	}
}
