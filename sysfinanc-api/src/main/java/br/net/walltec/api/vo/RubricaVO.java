package br.net.walltec.api.vo;

public class RubricaVO extends GerenciadorPadraoVO {

    private Integer id;

    private String dataCadastroStr;

    private String descricao;

    private Integer idTipoConta;

    private String descTipoConta;

    private boolean despesa;

    public Integer getId() {
        return id;
    }


    public String getDataCadastroStr() {
        return dataCadastroStr;
    }

    public void setDataCadastroStr(String dataCadastroStr) {
        this.dataCadastroStr = dataCadastroStr;
    }

    public String getDescricao() {
        return descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public Integer getIdTipoConta() {
        return idTipoConta;
    }

    public void setIdTipoConta(Integer idTipoConta) {
        this.idTipoConta = idTipoConta;
    }

    public String getDescTipoConta() {
        return descTipoConta;
    }

    public void setDescTipoConta(String descTipoConta) {
        this.descTipoConta = descTipoConta;
    }


    public boolean isDespesa() {
        return despesa;
    }

    public void setDespesa(boolean despesa) {
        this.despesa = despesa;
    }


	/**
	 * @param id the id to set
	 */
	public void setId(Integer id) {
		this.id = id;
	}


	@Override
	public String toString() {
		StringBuilder builder = new StringBuilder();
		builder.append("RubricaVO [");
		builder.append(descTipoConta);
		builder.append(", ");
		builder.append(descricao);
		builder.append(", ");
		builder.append(despesa);
		builder.append("]");
		return builder.toString();
	}
}
