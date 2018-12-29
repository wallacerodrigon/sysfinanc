/**
 * 
 */
package br.net.walltec.api.dto;

import java.math.BigDecimal;

import br.net.walltec.api.entidades.Lancamento;
import br.net.walltec.api.enums.EnumClassificacaoConta;
import br.net.walltec.api.utilitarios.Constantes;

/**
 * @author tr301222
 *
 */
public class ResumoDetalhadoMesAnoDTO extends ResumoMesAnoDTO {


	private BigDecimal totalRecebido;
	
	private BigDecimal totalReceber;
	
	private BigDecimal totalPago;
	
	private BigDecimal totalPagar;
	
	public ResumoDetalhadoMesAnoDTO() {
		super(0, 0, BigDecimal.ZERO, BigDecimal.ZERO, BigDecimal.ZERO);
		this.totalReceber = BigDecimal.ZERO;
		this.totalRecebido = BigDecimal.ZERO;
		this.totalPago = BigDecimal.ZERO;
		this.totalPagar = BigDecimal.ZERO;
		this.setValorNaoConciliado(BigDecimal.ZERO);
	}
	
	/**
	 * @param ano
	 * @param mes
	 * @param totalDespesas
	 * @param totalReceitas
	 */
	public ResumoDetalhadoMesAnoDTO(Integer ano, Integer mes, BigDecimal totalDespesas, BigDecimal totalReceitas) {
		this();
		this.setAno(ano);
		this.setMes(mes);
		this.setTotalDespesas(totalDespesas);
		this.setTotalReceitas(totalReceitas);
	}
	
	
	
	public BigDecimal getTotalRecebido() {
		return totalRecebido;
	}

	public void setTotalRecebido(BigDecimal totalRecebido) {
		this.totalRecebido = totalRecebido;
	}

	public BigDecimal getTotalReceber() {
		return totalReceber;
	}

	public void setTotalReceber(BigDecimal totalReceber) {
		this.totalReceber = totalReceber;
	}

	public BigDecimal getTotalPago() {
		return totalPago;
	}

	public void setTotalPago(BigDecimal totalPago) {
		this.totalPago = totalPago;
	}

	public BigDecimal getTotalPagar() {
		return totalPagar;
	}

	public void setTotalPagar(BigDecimal totalPagar) {
		this.totalPagar = totalPagar;
	}

	public void addTotalDespesas(Lancamento lancamento) {
		if (lancamento.isDespesa()) {
			this.setTotalDespesas(this.getTotalDespesas().add(getValorLancamento(lancamento)));
			lancamento.addStatus( EnumClassificacaoConta.DESPESA );
		}
	}
	
	public void addTotalReceitas(Lancamento lancamento) {
		if (lancamento.isReceita()) {
			this.setTotalReceitas(this.getTotalReceitas().add(getValorLancamento(lancamento)));
			lancamento.addStatus( EnumClassificacaoConta.RECEITA );
		}
	}

	public void addTotalPagar(Lancamento lancamento) {
		if (lancamento.isDespesa() && !lancamento.getBolPaga()) {
			this.setTotalPagar(this.getTotalPagar().add(getValorLancamento(lancamento)));
			lancamento.addStatus( EnumClassificacaoConta.APAGAR );
		}
	}
	
	public void addTotalReceber(Lancamento lancamento) {
		if (lancamento.isReceita() && !lancamento.getBolPaga()) {
			this.setTotalReceber(this.getTotalReceber().add(getValorLancamento(lancamento)));
			lancamento.addStatus( EnumClassificacaoConta.ARECEBER );
		}
	}
	

	public void addTotalPago(Lancamento lancamento) {
		if (lancamento.isDespesa() && lancamento.getBolPaga()) {
			this.setTotalPago(this.getTotalPago().add(getValorLancamento(lancamento)));
			lancamento.addStatus(  EnumClassificacaoConta.PAGO );
		}
	}
	
	public void addTotalConciliado(Lancamento lancamento) {
		if (!lancamento.getFormaPagamento().getId().equals(Constantes.ID_FORMA_PAGAMENTO_DEBITO)) {
			return;
		}		
		
		if (lancamento.getBolConciliado() && lancamento.isReceita()) {
			this.setValorConciliado(
					this.getValorConciliado().add(
							this.getValorLancamento(lancamento)));
			lancamento.addStatus(  EnumClassificacaoConta.CONCILIADA );
			
		} else if (lancamento.getBolConciliado() && lancamento.isDespesa()) {
			this.setValorConciliado(
					this.getValorConciliado().subtract(
							this.getValorLancamento(lancamento)));
			lancamento.addStatus( EnumClassificacaoConta.CONCILIADA );
		}

	}	
	
	public void addTotalNaoConciliado(Lancamento lancamento) {
		if (lancamento.getBolConciliado() || !lancamento.getFormaPagamento().getId().equals(Constantes.ID_FORMA_PAGAMENTO_DEBITO)) {
			return;
		}
			
		if (lancamento.getBolPaga() && lancamento.isReceita()) {
			this.setValorNaoConciliado(
					this.getValorNaoConciliado().add(
							this.getValorLancamento(lancamento)));
			lancamento.addStatus( EnumClassificacaoConta.NAO_CONCILIADA );
		} else if (lancamento.getBolPaga()) {
			this.setValorNaoConciliado(
					this.getValorNaoConciliado().subtract(
							this.getValorLancamento(lancamento)));
			lancamento.addStatus( EnumClassificacaoConta.NAO_CONCILIADA );
		}
	}	
	
	public void addTotalRecebido(Lancamento lancamento) {
		if (lancamento.isReceita() && lancamento.getBolPaga()) {
			this.setTotalRecebido(this.getTotalRecebido().add(getValorLancamento(lancamento)));
			lancamento.addStatus( EnumClassificacaoConta.RECEBIDO);
		}
	}	

	/**
	 * @param lancamento
	 * @return
	 */
	private BigDecimal getValorLancamento(Lancamento lancamento) {
		BigDecimal valor = lancamento.getValor() == null ? BigDecimal.ZERO : lancamento.getValor();
		return valor;
	}
	
	
}


