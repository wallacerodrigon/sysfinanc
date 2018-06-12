package br.net.walltec.api.excecoes;

public class WalltecException extends Exception {

    public WalltecException(String message) {
        super(message);
    }

    public WalltecException(String message, Throwable cause) {
        super(message, cause);
    }

    public WalltecException(Throwable cause) {
        super(cause);
    }
}
