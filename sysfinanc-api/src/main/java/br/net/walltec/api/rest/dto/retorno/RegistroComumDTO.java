/**
 * 
 */
package br.net.walltec.api.rest.dto.retorno;

import java.io.Serializable;

/**
 * @author wallace
 *
 */
@SuppressWarnings("serial")
public class RegistroComumDTO implements Serializable {

	private Integer idAluno;
	
	private String nome;
	
	private String nomeModalidade;
	
	private String nomeTurma;
	
	private String arquivoRelatorio;
	
	private boolean responsavel;
	 
	/**
	 * @return the responsavel
	 */
	public boolean isResponsavel() {
		return responsavel;
	}

	/**
	 * @param responsavel the responsavel to set
	 */
	public void setResponsavel(boolean responsavel) {
		this.responsavel = responsavel;
	}	

	/**
	 * @return the nomeModalidade
	 */
	public String getNomeModalidade() {
		return nomeModalidade;
	}

	/**
	 * @param nomeModalidade the nomeModalidade to set
	 */
	public void setNomeModalidade(String nomeModalidade) {
		this.nomeModalidade = nomeModalidade;
	}

	/**
	 * @return the nomeTurma
	 */
	public String getNomeTurma() {
		return nomeTurma;
	}

	/**
	 * @param nomeTurma the nomeTurma to set
	 */
	public void setNomeTurma(String nomeTurma) {
		this.nomeTurma = nomeTurma;
	}

	/**
	 * @return the idAluno
	 */
	public Integer getIdAluno() {
		return idAluno;
	}

	/**
	 * @param idAluno the idAluno to set
	 */
	public void setIdAluno(Integer idAluno) {
		this.idAluno = idAluno;
	}

	/**
	 * @return the nome
	 */
	public String getNome() {
		return nome;
	}

	/**
	 * @param nome the nome to set
	 */
	public void setNome(String nome) {
		this.nome = nome;
	}

	/**
	 * @return the arquivoRelatorio
	 */
	public String getArquivoRelatorio() {
		return arquivoRelatorio;
	}

	/**
	 * @param arquivoRelatorio the arquivoRelatorio to set
	 */
	public void setArquivoRelatorio(String arquivoRelatorio) {
		this.arquivoRelatorio = arquivoRelatorio;
	}
	
	
}
