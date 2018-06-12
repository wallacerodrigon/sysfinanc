/**
 * 
 */
package br.net.walltec.api.utilitarios;

/**
 * @author wallace
 *
 */
public class UtilObjeto {

	private static final String REGX_SOMENTE_NUMEROS = "[^0-9]";
	
	public static boolean isVazio(Object objeto){
		if (objeto == null){
			return true;
		} else if (objeto instanceof String){
			return ((String)objeto).isEmpty();
		}
		return false;
	}
	
	public static boolean isNotVazio(Object texto){
		return ! isVazio(texto);
	}
	
	public static String manterSomenteNumeros(String texto){
		if (texto != null){
			return texto.replaceAll(REGX_SOMENTE_NUMEROS, "");
		}
		return texto;
	}
	
}
