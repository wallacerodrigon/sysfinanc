/**
 * 
 */
package br.net.walltec.api.utilitarios;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

/**
 * @author wallace
 *
 */
public class UtilCriptografia {

	 /**
	  * Criptografa uma string
	 * @param valor
	 * @return
	 * @throws NoSuchAlgorithmException
	 */
	public static String criptografa(String valor) throws NoSuchAlgorithmException {
		  MessageDigest md = MessageDigest.getInstance("MD5");
		  byte[] codifica = md.digest(valor.getBytes());


		  String codigo = "";
		  for (int i = 0; i < codifica.length; ++i) {
		    String temp = Integer.toHexString(codifica[i]);
		    int tamanho = temp.length();
		    if (tamanho == 1)
		      codigo = codigo + "0" + temp;
		    else {
		      codigo = codigo + temp.substring(tamanho - 2, tamanho);
		    }
		  }

		  return codigo;
		 
	 }

}
