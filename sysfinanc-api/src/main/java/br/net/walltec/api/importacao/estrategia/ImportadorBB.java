package br.net.walltec.api.importacao.estrategia;

import java.math.BigDecimal;
import java.nio.charset.Charset;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import java.util.stream.IntStream;
import java.util.stream.Stream;

import br.net.walltec.api.dto.RegistroExtratoDto;
import br.net.walltec.api.excecoes.WalltecException;
import br.net.walltec.api.utilitarios.UtilFormatador;
import br.net.walltec.api.vo.LancamentoVO;

public class ImportadorBB implements ImportadorArquivo {

	private static final String NAO_CREDITO_DEBITO = "[^C|D]";
	private static final String FLAG_DEBITO = "D";
	private static final String FLAG_CREDITO = "C";
	private static final String REGEX_DATA_DOCUMENTO = "[0-9]{2}[/][0-9]{2}[/][0-9]{2}";
	private static final String QUEBRA_LINHA = "\n";
	private static final String CHARSET_8859_1 = "ISO-8859-1";
	private static final String TAG_SALDO = "S A L D O";

	@Override
    public List<RegistroExtratoDto> importar(String nomeArquivo, byte[] dadosArquivo, List<LancamentoVO> listaParcelas) throws WalltecException {
    	
    	Map<String, List<LancamentoVO>> mapLancamentosPorDocumento = mapearLancamentosPorDocumento(listaParcelas);
    	Map<Double, List<LancamentoVO>> mapLancamentosPorValor = mapearLancamentosPorValor(listaParcelas);

        String[] linhas = new String(dadosArquivo, Charset.forName(CHARSET_8859_1)).split(QUEBRA_LINHA);
        List<LancamentoVO> lancamentosAssociados = new ArrayList<>();
        List<RegistroExtratoDto> dtos = associarLancamentos(mapLancamentosPorDocumento, mapLancamentosPorValor, linhas,
				lancamentosAssociados);        //lista de lancmaentos nao associados: os que não tiverem sido associados, gravar antes de mandar para a tela
        List<LancamentoVO> lancamentosNaoAssociados = 
        			listaParcelas
        			.stream()
        			.filter(vo -> vo.isBolPaga() && vo.getValor() > 0)
        			.filter(vo -> 
        				!lancamentosAssociados.contains(vo)
        			)
        			.collect(Collectors.toList());
        					
        dtos.stream()
        	.filter(dto -> dto.getLancamentos() == null && !dto.getHistorico().equals(TAG_SALDO))
        	.forEach(dto -> dto.setLancamentos(lancamentosNaoAssociados));
        
        return dtos;
      }

	/**
	 * @param mapLancamentosPorDocumento
	 * @param mapLancamentosPorValor
	 * @param linhas
	 * @param lancamentosAssociados
	 * @return
	 */
	private List<RegistroExtratoDto> associarLancamentos(Map<String, List<LancamentoVO>> mapLancamentosPorDocumento,
			Map<Double, List<LancamentoVO>> mapLancamentosPorValor, String[] linhas,
			List<LancamentoVO> lancamentosAssociados) {
		List<RegistroExtratoDto> dtos = montarListaExtratoDto(linhas);
		corrigirDescricaoDocumento(dtos);
		return configurarLancamentosAoDto(mapLancamentosPorDocumento, mapLancamentosPorValor, lancamentosAssociados,
				dtos);
	}

	/**
	 * @param mapLancamentosPorDocumento
	 * @param mapLancamentosPorValor
	 * @param lancamentosAssociados
	 * @param dtos
	 * @return
	 */
	private List<RegistroExtratoDto> configurarLancamentosAoDto(
			Map<String, List<LancamentoVO>> mapLancamentosPorDocumento,
			Map<Double, List<LancamentoVO>> mapLancamentosPorValor, List<LancamentoVO> lancamentosAssociados,
			List<RegistroExtratoDto> dtos) {
		
		dtos = dtos.stream()
   	          .filter(dto -> 
   	        	    dto.getDataLancamento().matches(REGEX_DATA_DOCUMENTO) 
   	        	&& (dto.getCreditoDebito().trim().equalsIgnoreCase(FLAG_CREDITO) || dto.getCreditoDebito().trim().equalsIgnoreCase(FLAG_DEBITO)) )
   	          .map(dto -> {
					associarLancamentos(dto, mapLancamentosPorDocumento, mapLancamentosPorValor);
					if (dto.getLancamentos() != null) {
						lancamentosAssociados.addAll(dto.getLancamentos());
						IntStream ids = dto
								.getLancamentos()
								.stream()
								.mapToInt(LancamentoVO::getId);
						dto.setArrayIds(ids.toArray());
					}
					return dto;
   	          })
   	          .collect(Collectors.toList());
		return dtos;
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
					dto.setDataLancamento(linha.substring(0,8));
					dto.setHistorico(linha.substring(17, 43).trim());
					dto.setDocumento(linha.substring(43, 66).trim());
					dto.setValor( linha.substring(67,78).trim().isEmpty() ? "0" : linha.substring(67,78).trim() );
					dto.setCreditoDebito( linha.substring(79, 80).trim() );
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

	/**
	 * @param listaParcelas
	 * @param linhas
	 * @param lancamentosAssociados
	 */
	private void associarLancamentos(RegistroExtratoDto dto, Map<String, List<LancamentoVO>> mapLancamentosPorDocumento,
			Map<Double, List<LancamentoVO>> mapLancamentosPorValor) {
		
		if (dto.getCreditoDebito().isEmpty() || dto.getCreditoDebito().matches(NAO_CREDITO_DEBITO)) {
			return;
		}
		
		if (dto.getHistorico().contains(TAG_SALDO)){
			dto.setConfirmado(true);
			return;
		}
		
		BigDecimal valor = UtilFormatador.formatarStringComoValor(dto.getValor().replaceAll("[.]", "").replaceAll(",", "."));
		if (mapLancamentosPorDocumento.containsKey(dto.getDocumento())) {
			dto.setLancamentos(mapLancamentosPorDocumento.get(dto.getDocumento()));
			//dto.setConfirmado(true);
		} else {
			List<LancamentoVO> lancamentos = mapLancamentosPorValor.get(valor.doubleValue());
			dto.setLancamentos( lancamentos );
		//	dto.setConfirmado(dto.getLancamentos() != null && !dto.getLancamentos().isEmpty());
		}
		
		
	}
    
}
