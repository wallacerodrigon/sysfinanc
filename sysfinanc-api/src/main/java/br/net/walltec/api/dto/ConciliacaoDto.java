package br.net.walltec.api.dto;

public class ConciliacaoDto extends DtoPadrao {

    private String nomeArquivo;

    private String mesAnoLancamentos;

    private Integer numBanco;

    public String getNomeArquivo() {
        return nomeArquivo;
    }

    public void setNomeArquivo(String nomeArquivo) {
        this.nomeArquivo = nomeArquivo;
    }

    public String getMesAnoLancamentos() {
        return mesAnoLancamentos;
    }

    public void setMesAnoLancamentos(String mesAnoLancamentos) {
        this.mesAnoLancamentos = mesAnoLancamentos;
    }

    public Integer getNumBanco() {
        return numBanco;
    }

    public void setNumBanco(Integer numBanco) {
        this.numBanco = numBanco;
    }
}
