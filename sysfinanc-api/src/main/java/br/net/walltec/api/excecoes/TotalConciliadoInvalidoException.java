package br.net.walltec.api.excecoes;

public class TotalConciliadoInvalidoException extends NegocioException {
    public TotalConciliadoInvalidoException(String message) {
        super(message);
    }

    public TotalConciliadoInvalidoException(String message, Throwable cause) {
        super(message, cause);
    }

    public TotalConciliadoInvalidoException(Throwable cause) {
        super(cause);
    }
}
