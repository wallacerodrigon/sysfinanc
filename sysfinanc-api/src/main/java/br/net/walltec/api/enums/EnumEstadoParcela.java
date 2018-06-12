/**
 * 
 */
package br.net.walltec.api.enums;

/**
 * @author Wallace
 *
 */
public enum EnumEstadoParcela {
	AMBAS(0, "Todos os Estados"),
	PAGAS(1, "Quitadas"),
	ABERTAS(2, "Abertas"),
	NAO_CONCILIADOS(3, "N�o Conciliados"),
	CONCILIADOS(4, "Conciliados");
	
	private Integer id;
	private String nome;
	
	private EnumEstadoParcela(Integer id, String nome){
		this.id = id;
		this.nome = nome;
		
	}
	/**
	 * @return the id
	 */
	public Integer getId() {
		return id;
	}
	/**
	 * @param id the id to set
	 */
	public void setId(Integer id) {
		this.id = id;
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
	
	public static EnumEstadoParcela getEnumPorId(Integer id){
		for(EnumEstadoParcela enumEstado : EnumEstadoParcela.values()){
			if (enumEstado.getId().equals(id)){
				return enumEstado;
			}
		}
		return null;
	}

}
