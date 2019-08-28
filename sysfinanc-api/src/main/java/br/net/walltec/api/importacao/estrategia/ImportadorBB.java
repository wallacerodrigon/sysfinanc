package br.net.walltec.api.importacao.estrategia;

import java.nio.charset.Charset;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import br.net.walltec.api.dto.RegistroExtratoDto;
import br.net.walltec.api.excecoes.WalltecException;
import br.net.walltec.api.utilitarios.Constantes;
import br.net.walltec.api.utilitarios.UtilFormatador;
import br.net.walltec.api.vo.LancamentoVO;

public class ImportadorBB implements ImportadorArquivo {

	private static final String FLAG_DEBITO = "D";
	private static final String FLAG_CREDITO = "C";
	private static final String REGEX_DATA_DOCUMENTO = "[0-9]{2}[/][0-9]{2}[/][0-9]{4}";
	private static final String QUEBRA_LINHA = "\n";
	private static final String CHARSET_8859_1 = "ISO-8859-1";
	private static final String TAG_SALDO = "S A L D O";
//
//	IMPORTAR O CSV
//public static void main(String[] args) throws Exception {
//		
//		String file = "c:\\temp\\extrato-agosto.csv";
//		
//		BufferedReader reader = new BufferedReader(new FileReader(file));
//		String linha = null;
//				
//		int contaCredito = 736;
//		int contaDebito = 152;
//		
//		System.out.println("insert into lancamento(co_conta,nu_parcela,dt_vencimento,va_parcela,co_formapagamento,no_descricao,bolpaga,bolconciliado,numdocumento) values");
//		while ( (linha = reader.readLine()) != null) {
//			String linha2 = linha.replaceAll("\"", "");
//			String dados[] = linha2.split(",");
//			
//			Date dataVencimento = DataUtil.getData(dados[0].replace("\"", ""), "dd/MM/yyyy");
//			String dataMysql = DataUtil.getDataFormatoString(dataVencimento, "yyyy-MM-dd");
//			
//			String conta = dados[5].startsWith("-") ? "152" : "736";
//			String valor = dados[5].replaceAll("[-]", "");
//			
//			System.out.println("(" + conta + ",1,'"+ dataMysql+"',"+valor+",34,'" + dados[2]  + "', 1, 1, '" + dados[4] + "'),");
//		}
//		
//		reader.close();
//		
//		
	
	@Override
    public List<RegistroExtratoDto> importar(String nomeArquivo, byte[] dadosArquivo, List<LancamentoVO> listaParcelas) throws WalltecException {
    	
		List<RegistroExtratoDto> dtos = montarListaExtratoDto(
				new String(dadosArquivo, Charset.forName(CHARSET_8859_1)).split(QUEBRA_LINHA)
				);
		corrigirDescricaoDocumento(dtos);
		return associarDtoALancamentos(
				filtrarExtratosCorretos(dtos), 
				filtrarLancamentosDebContaPagos(listaParcelas));
      }

	/**
	 * @param listaParcelas
	 * @return
	 */
	private List<LancamentoVO> filtrarLancamentosDebContaPagos(List<LancamentoVO> listaParcelas) {
		List<LancamentoVO> lancamentosDisponiveis = listaParcelas
				.stream()
				.filter(vo -> vo.getIdFormaPagamento().equals(Constantes.ID_FORMA_PAGAMENTO_DEBITO))
				.filter(vo -> vo.isBolPaga())
				.collect(Collectors.toList());
		return lancamentosDisponiveis;
	}

	/**
	 * @param dtos
	 * @return
	 */
	private List<RegistroExtratoDto> filtrarExtratosCorretos(List<RegistroExtratoDto> dtos) {
		dtos = dtos.stream()
				.filter(dto -> dto.getDataLancamento().matches(REGEX_DATA_DOCUMENTO))
				.filter(dto -> (dto.getCreditoDebito().trim().equalsIgnoreCase(FLAG_CREDITO) || dto.getCreditoDebito().trim().equalsIgnoreCase(FLAG_DEBITO)))
				.collect(Collectors.toList());
		return dtos;
	}

	/**
	 * @param dtos
	 * @param lancamentosDisponiveis
	 */
	private List<RegistroExtratoDto> associarDtoALancamentos(List<RegistroExtratoDto> dtos, List<LancamentoVO> lancamentosDisponiveis) {
		//tentar associar por documento
    	Map<String, List<LancamentoVO>> lancamentosPorDocumento = mapearLancamentosPorDocumento(lancamentosDisponiveis);
		associarPorDocumento(lancamentosPorDocumento, dtos);
    	List<LancamentoVO> naoAssociados = recuperarLancamentosNaoAssociados(lancamentosDisponiveis, lancamentosPorDocumento);
    	naoAssociados = associarPorValor(mapearLancamentosPorValor(naoAssociados), dtos);
    	configurarNaoAssociados(dtos, naoAssociados);
    	return dtos;
	}

	/**
	 * @param lancamentosDisponiveis
	 * @param lancamentosPorDocumento
	 * @return
	 */
	private List<LancamentoVO> recuperarLancamentosNaoAssociados(List<LancamentoVO> lancamentosDisponiveis,
			Map<String, List<LancamentoVO>> lancamentosPorDocumento) {
		List<LancamentoVO> lancamentosAssociadosPorDocumento = extrairLancamentoVO(lancamentosPorDocumento);		
		return lancamentosDisponiveis
				.stream()
				.filter(vo -> !lancamentosAssociadosPorDocumento.contains(vo))
				.collect(Collectors.toList());
	}

	/**
	 * @param lancamentosPorDocumento
	 * @return
	 */
	private List<LancamentoVO> extrairLancamentoVO(Map<String, List<LancamentoVO>> lancamentosPorDocumento) {
		List<LancamentoVO> vos = new ArrayList<>();
		for(Map.Entry<String,List<LancamentoVO>> entry : lancamentosPorDocumento.entrySet()) {
			vos.addAll(entry.getValue());
		}
		
		return vos;
	}

	/**
	 * @param dtos
	 * @param lancamentos
	 */
	private void configurarNaoAssociados(List<RegistroExtratoDto> dtos, List<LancamentoVO> lancamentos) {
		dtos.stream()
			.filter(dto -> dto.getLancamentos() == null)
			.forEach(dto -> {
				if (dto.getHistorico().contains(TAG_SALDO)) {
					dto.setConfirmado(true);
					dto.setLancamentos(null);
				} else {
					dto.setLancamentos(lancamentos);
					dto.setConfirmado(false);
				}
			});
	}

	/**
	 * @param mapLancamentosPorValor
	 * @param collect
	 * @return 
	 */
	private List<LancamentoVO> associarPorValor(Map<Double, List<LancamentoVO>> mapLancamentosPorValor,
			List<RegistroExtratoDto> dtos) {
		dtos.stream()
		.filter(dto -> !dto.isConciliado())
		.filter(dto -> mapLancamentosPorValor.containsKey(UtilFormatador.formatarStringComoValor(dto.getValor()).doubleValue()))
		.forEach(dto -> {
			dto.setLancamentos(mapLancamentosPorValor.get(UtilFormatador.formatarStringComoValor(dto.getValor()).doubleValue()));
			dto.setConfirmado(false);
			dto.setConciliado(false);
			dto.setArrayIds(new int[0]);
			//this.atribuirIdsLancamentos(dto);
			mapLancamentosPorValor.remove(UtilFormatador.formatarStringComoValor(dto.getValor()).doubleValue());
		});
		List<LancamentoVO> vos = new ArrayList<>();
		for(List<LancamentoVO> lancamentos : mapLancamentosPorValor.values()) {
			vos.addAll(lancamentos);
		}
		return new ArrayList<LancamentoVO>(vos);
	}
	
	private void atribuirIdsLancamentos(RegistroExtratoDto dto) {
		if (dto.getLancamentos() != null) {
			dto.setArrayIds(
					dto
					.getLancamentos()
					.stream()
					.mapToInt(LancamentoVO::getId)
					.toArray());
			
		}
		
	}

	/**
	 * @param mapLancamentosPorDocumento
	 * @param dtos
	 * @return 
	 */
	private void associarPorDocumento(Map<String, List<LancamentoVO>> mapLancamentosPorDocumento,
			List<RegistroExtratoDto> dtos) {
		dtos.stream()
			.filter(dto -> mapLancamentosPorDocumento.containsKey(dto.getDocumento()))
			.filter(dto -> !dto.getHistorico().contains(TAG_SALDO))
			.forEach(dto -> {
				dto.setLancamentos(mapLancamentosPorDocumento.get(dto.getDocumento()));
				dto.setConfirmado(dto.getLancamentos() != null);
				dto.setConciliado(dto.isConfirmado());
				this.atribuirIdsLancamentos(dto);
			});
	}

	/**
	 * @param dtos
	 */
	private void corrigirDescricaoDocumento(List<RegistroExtratoDto> dtos) {
		for(int i = 1; i < dtos.size(); i++) {
			RegistroExtratoDto dto = dtos.get(i);
			if (dto.getDataLancamento().trim().isEmpty()) {
				dtos.get(i - 1).setHistorico(dtos.get(i-1).getHistorico() + " "+ dto.getHistorico());
			}
		}
	}

	/**
	 * @param linhas
	 * @return
	 */
	private List<RegistroExtratoDto> montarListaExtratoDto(String[] linhas) {
		List<RegistroExtratoDto> dtos = Stream.of(linhas)
   	    	  .skip(9)
   	          .map(linha -> {
  	        	    RegistroExtratoDto dto = new RegistroExtratoDto();
  	        	    boolean isSaldo = linha.contains("S A L D O");
  	        	    if (linha.trim().length() > 80 && !isSaldo) {
  	        	    	dto.setDataLancamento(linha.substring(0,10));
  	        	    	dto.setHistorico(linha.substring(19, 41).trim());
  	        	    	dto.setDocumento(linha.substring(45, 64).trim().isEmpty() ? "0" : linha.substring(45, 64).trim());
  	        	    	dto.setValor( linha.substring(70,81).trim() );
  	        	    	dto.setCreditoDebito( linha.substring(81,83).trim());
  	        	    } else if (isSaldo) {
  	        	    	dto.setDataLancamento(linha.substring(0,10));
  	        	    	dto.setHistorico("SALDO FINAL");
  	        	    	dto.setDocumento("-999");
  	        	    	dto.setValor( linha.substring(90,103).trim() );
  	        	    	dto.setCreditoDebito( "C" );
  	        	    } else {
  	        	    	dto.setDataLancamento("");
  	        	    	dto.setHistorico(linha.trim()); 
  	        	    }
  	        	    
					return dto;
   	          })
   	          .collect(Collectors.toList());
		return dtos;
	}

	/**
	 * @param listaParcelas
	 * @return
	 */
	private Map<Double, List<LancamentoVO>> mapearLancamentosPorValor(List<LancamentoVO> listaParcelas) {
		Map<Double, List<LancamentoVO>> mapLancamentosPorValor = listaParcelas.stream()
        		.collect(Collectors.groupingBy(LancamentoVO::getValor));
		return mapLancamentosPorValor;
	}

	/**
	 * @param listaParcelas
	 * @return
	 */
	private Map<String, List<LancamentoVO>> mapearLancamentosPorDocumento(List<LancamentoVO> listaParcelas) {
		Map<String, List<LancamentoVO>> mapLancamentosPorDocumento = listaParcelas.stream()
    		.filter(vo -> vo.getNumDocumento() != null)
    		.collect(Collectors.groupingBy(LancamentoVO::getNumDocumento));
		return mapLancamentosPorDocumento;
	}
    
}
