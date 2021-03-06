/**
 * 
 */
package br.net.walltec.api.vo;

/**
 * @author tr301222
 *
 */
public class UsuarioVO extends GerenciadorPadraoVO {

    private Integer id;

    private String nome;

    private String login;

    private String token;

    private String csrf;

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getLogin() {
        return login;
    }

    public void setLogin(String login) {
        this.login = login;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

	/**
	 * @return the csrf
	 */
	public String getCsrf() {
		return csrf;
	}

	/**
	 * @param csrf the csrf to set
	 */
	public void setCsrf(String csrf) {
		this.csrf = csrf;
	}

}
