/**
 * 
 */
package br.net.walltec.api.rest;

import java.util.Comparator;

import br.net.walltec.api.vo.RubricaVO;

/**
 * @author wallace
 *
 */
public class OrdenacaoRubricas implements Comparator<RubricaVO> {

	/* (non-Javadoc)
	 * @see java.util.Comparator#compare(java.lang.Object, java.lang.Object)
	 */
	@Override
	public int compare(RubricaVO o1, RubricaVO o2) {
		if ( o1 == null && o2 == null ) {
			return 0;
		}
		return o1.getDescricao().compareToIgnoreCase(o2.getDescricao());
	}

}

