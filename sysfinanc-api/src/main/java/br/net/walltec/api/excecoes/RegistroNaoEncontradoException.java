package br.net.walltec.api.excecoes;

public class RegistroNaoEncontradoException extends NegocioException {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	public RegistroNaoEncontradoException(String mensagem) {
		super(mensagem);
		// TODO Auto-generated constructor stub
	}

	public RegistroNaoEncontradoException(String message, Throwable cause) {
		super(message, cause);
	}

	public RegistroNaoEncontradoException(Throwable throwable) {
		super(throwable);
		// TODO Auto-generated constructor stub
	}

}
