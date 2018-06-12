/**
 * 
 */
package br.net.walltec.api.converters;

import java.util.Date;

import br.net.walltec.api.utilitarios.UtilData;
import br.net.walltec.api.utilitarios.UtilObjeto;

/**
 * @author tr301222
 *
 */
public class ConverterDataToString implements Converters {

	/* (non-Javadoc)
	 * @see br.net.walltec.api.converters.Converters#converter(java.lang.Object)
	 */
	@Override
	public String converter(Object objeto) {
		if (objeto != null){
			return UtilData.getDataFormatada(new Date(objeto.toString()));
		} else {
			return null;
		}

	}

	/* (non-Javadoc)
	 * @see br.net.walltec.api.converters.Converters#converter(java.lang.String)
	 */
	@Override
	public Object converter(String value) {
		if (UtilObjeto.isNotVazio(value)){
			return UtilData.getData(value, "/"); 
		} else {
			return null;
		}
	}

}
