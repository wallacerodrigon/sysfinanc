package br.net.walltec.api.importacao.estrategia;

import java.nio.charset.Charset;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.enterprise.inject.spi.CDI;
import javax.inject.Inject;
import javax.inject.Named;

import br.net.walltec.api.dto.RegistroExtratoDto;
import br.net.walltec.api.excecoes.WalltecException;
import br.net.walltec.api.negocio.servicos.LancamentoServico;
import br.net.walltec.api.utilitarios.Constantes;
import br.net.walltec.api.vo.LancamentoVO;

@Named
public class ImportadorCSVBB implements ImportadorArquivo {

	public static final String DATA = "dd/MM/yyyy";	
	private static final String CHARSET_8859_1 = "ISO-8859-1";	

	private LancamentoServico servico;
	
	public static Date getData(String data, String formato) {
		DateFormat df = new SimpleDateFormat(formato);
		try {
			return df.parse(data);
		} catch (ParseException e) {
			e.printStackTrace();
		}
		return null;
	}
	
	/**
	 * @return Retorna a data no formato dd/mm/yyyy.
	 */
	public static String getDataFormatoString(Date data) {
		return data==null ? null : new SimpleDateFormat(DATA).format(data);
	}

	/**
	 * @return Retorna a data no formato dd/mm/yyyy.
	 */
	public static String getDataFormatoString(Date data, String formato) {
		return new SimpleDateFormat(formato).format(data);
	}
	
	/* (non-Javadoc)
	 * @see br.net.walltec.api.importacao.estrategia.ImportadorArquivo#importar(java.lang.String, byte[], java.util.List)
	 */
	@Override
	public List<RegistroExtratoDto> importar(String nomeArquivo, byte[] dadosArquivo, List<LancamentoVO> listaParcelas)
			throws WalltecException {
			List<LancamentoVO> listaVOs = recuperarListaLancamentoVO(dadosArquivo);
			servico =  CDI.current().select(LancamentoServico.class).get();
			System.out.println(servico);
			
			return new ArrayList<>();

	}

	/**
	 * @param dadosArquivo
	 */
	private List<LancamentoVO> recuperarListaLancamentoVO(byte[] dadosArquivo) throws WalltecException {
		String[] dados = new String(dadosArquivo, Charset.forName(CHARSET_8859_1)).split("\n");
		
		int numLinha = 0;
		List<LancamentoVO> lancamentos = new ArrayList<LancamentoVO>();
		for(String dado : dados) {
			
			if (numLinha == 0) {
				++numLinha;
				continue;
			}
			String linha2 = dado.replaceAll("\"", "");
			String dadosDaLinha[] = linha2.split(",");
			
			Date dataVencimento = getData(dadosDaLinha[0].replace("\"", ""), DATA);
			String dataVencimentoStr = getDataFormatoString(dataVencimento, DATA);
			
			String conta = dadosDaLinha[5].startsWith("-") ? "152" : "736";
			String valor = dadosDaLinha[5].replaceAll("[-]", "");
			
//					System.out.println("(" + conta + ",1,'"+ dataVencimentoStr+"',"+valor+",34,'" + dados[2]  + "', 1, 1, '" + dados[4] + "'),");
			
			LancamentoVO vo = new LancamentoVO();
			vo.setBolConciliado(true);
			vo.setBolPaga(true);
			vo.setDataVencimentoStr( dataVencimentoStr );
			vo.setDescConta(dadosDaLinha[2]);
			vo.setIdFormaPagamento(Constantes.ID_FORMA_PAGAMENTO_DEBITO);
			vo.setDescricao(dadosDaLinha[2]);
			vo.setDespesa(conta.equals("152"));
			vo.setIdConta(Integer.valueOf(conta));
			vo.setNumDocumento(dadosDaLinha[4]);
			vo.setNumero(Short.valueOf("1"));
			vo.setValorDebitoStr(valor);
			vo.setValorDebitoStr(valor);
			
			lancamentos.add(vo);
			
			++numLinha;
		}
		return lancamentos;
	}
	
}
