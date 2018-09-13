/**
 * 
 */
package br.net.walltec.api.dto;

import java.util.List;

import br.net.walltec.api.vo.LancamentoVO;

/**
 * @author wallace
 *
 */
public class ConsultaLancamentosDTO extends DtoPadrao {

	private boolean mesFechado;
	
	private List<LancamentoVO> lancamentos;

	/**
	 * @return the mesFechado
	 */
	public boolean isMesFechado() {
		return mesFechado;
	}

	/**
	 * @param mesFechado the mesFechado to set
	 */
	public void setMesFechado(boolean mesFechado) {
		this.mesFechado = mesFechado;
	}

	/**
	 * @return the lancamentos
	 */
	public List<LancamentoVO> getLancamentos() {
		return lancamentos;
	}

	/**
	 * @param lancamentos the lancamentos to set
	 */
	public void setLancamentos(List<LancamentoVO> lancamentos) {
		this.lancamentos = lancamentos;
	}
	
	
}
