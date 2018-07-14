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

import org.hibernate.id.factory.IdentifierGeneratorFactory;

import br.net.walltec.api.dto.RegistroExtratoDto;
import br.net.walltec.api.excecoes.WalltecException;
import br.net.walltec.api.utilitarios.UtilFormatador;
import br.net.walltec.api.vo.LancamentoVO;

public class ImportadorBB implements ImportadorArquivo {
    @Override
    public List<RegistroExtratoDto> importar(String nomeArquivo, byte[] dadosArquivo, List<LancamentoVO> listaParcelas) throws WalltecException {
    	
    	Map<String, List<LancamentoVO>> mapLancamentosPorDocumento = mapearLancamentosPorDocumento(listaParcelas);
    	Map<Double, List<LancamentoVO>> mapLancamentosPorValor = mapearLancamentosPorValor(listaParcelas);

        String[] linhas = new String(dadosArquivo, Charset.forName("ISO-8859-1")).split("\n");
        List<LancamentoVO> lancamentosAssociados = new ArrayList<>();
        List<RegistroExtratoDto> dtos = associarLancamentos(mapLancamentosPorDocumento, mapLancamentosPorValor, linhas,
				lancamentosAssociados);
        //lista de lancmaentos nao associados: os que não tiverem sido associados, gravar antes de mandar para a tela
        List<LancamentoVO> lancamentosNaoAssociados = 
        			listaParcelas
        			.stream()
        			.filter(vo -> 
        				lancamentosAssociados.indexOf(vo) == -1
        			)
        			.collect(Collectors.toList());
        					
        dtos.stream()
        	.filter(dto -> dto.getLancamentos() == null && !dto.getHistorico().equals("S A L D O"))
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
		List<RegistroExtratoDto> dtos = Stream.of(linhas)
   	    	  .skip(9)
   	          .map(linha -> {
  	        	    RegistroExtratoDto dto = new RegistroExtratoDto();
					dto.setDataLancamento(linha.substring(0,8));
					dto.setHistorico(linha.substring(17, 43).trim());
					dto.setDocumento(linha.substring(43, 66).trim());
					dto.setValor( linha.substring(67,78).trim().isEmpty() ? "0" : linha.substring(67,78).trim() );
					dto.setCreditoDebito( linha.substring(79, 80).trim() );
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
   	          .filter(dto -> 
   	        	dto.getDataLancamento().matches("[0-9]{2}[/][0-9]{2}[/][0-9]{2}") 
   	        	&& (dto.getCreditoDebito().trim().equalsIgnoreCase("C") || dto.getCreditoDebito().trim().equalsIgnoreCase("D")) )
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
	 * @param dto
	 * @param mapLancamentosPorDocumento
	 * @param mapLancamentosPorValor
	 */
	private void associarLancamentos(RegistroExtratoDto dto, Map<String, List<LancamentoVO>> mapLancamentosPorDocumento,
			Map<Double, List<LancamentoVO>> mapLancamentosPorValor) {
		
		if (dto.getCreditoDebito().isEmpty() || dto.getCreditoDebito().matches("[^C|D]")) {
			return;
		}
		
		if (dto.getHistorico().contains("S A L D O")){
			dto.setConfirmado(true);
			return;
		}
		
		BigDecimal valor = UtilFormatador.formatarStringComoValor(dto.getValor().replaceAll("[.]", "").replaceAll(",", "."));
		if (mapLancamentosPorDocumento.containsKey(dto.getDocumento())) {
			dto.setLancamentos(mapLancamentosPorDocumento.get(dto.getDocumento()));
			dto.setConfirmado(true);
			mapLancamentosPorDocumento.remove(dto.getDocumento());
		} else {
			List<LancamentoVO> lancamentos = mapLancamentosPorValor.get(valor.doubleValue());
			
			if (lancamentos != null && lancamentos.size() == 1) {
				dto.setLancamentos( lancamentos );
				mapLancamentosPorValor.remove(valor.doubleValue());
			} else if (lancamentos != null) {
				dto.setLancamentos(Arrays.asList(lancamentos.get(0)));
				mapLancamentosPorValor.get(valor.doubleValue()).remove(0);
			}
		}
		
		
	}
    
}
