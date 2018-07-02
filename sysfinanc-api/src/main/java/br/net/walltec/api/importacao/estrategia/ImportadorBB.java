package br.net.walltec.api.importacao.estrategia;

import java.nio.charset.Charset;
import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import br.net.walltec.api.dto.RegistroExtratoDto;
import br.net.walltec.api.excecoes.WalltecException;
import br.net.walltec.api.vo.LancamentoVO;

public class ImportadorBB implements ImportadorArquivo {
    @Override
    public List<RegistroExtratoDto> importar(String nomeArquivo, byte[] dadosArquivo, List<LancamentoVO> listaParcelas) throws WalltecException {
    	
    	//mapeamento dos valores por documento
    	Map<String, List<LancamentoVO>> mapLancamentosPorDocumento = listaParcelas.stream()
    		.filter(vo -> vo.getNumDocumento() != null)
    		.collect(Collectors.groupingBy(LancamentoVO::getNumDocumento));

    	Map<Double, List<LancamentoVO>> mapLancamentosPorValor = listaParcelas.stream()
        		.collect(Collectors.groupingBy(LancamentoVO::getValor));

        String[] linhas = new String(dadosArquivo, Charset.forName("ISO-8859-1")).split("\n");
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
					return dto;
   	          })
   	          .filter(dto -> dto.getDataLancamento().matches("[0-9]{2}[/][0-9]{2}[/][0-9]{2}") && (dto.getCreditoDebito().trim().equalsIgnoreCase("C") || dto.getCreditoDebito().trim().equalsIgnoreCase("D")) )
   	          .collect(Collectors.toList());
        
        return dtos;
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
		
		if (mapLancamentosPorDocumento.containsKey(dto.getDocumento())) {
			mapLancamentosPorDocumento.remove(dto.getDocumento());
			dto.setLancamentos(mapLancamentosPorDocumento.get(dto.getDocumento()));
		} else {
			List<LancamentoVO> lancamentos = mapLancamentosPorValor.get(Double.valueOf(dto.getValor().replaceAll("[.]", "").replaceAll(",", ".")));
			
			if (lancamentos != null && lancamentos.size() == 1) {
				dto.setLancamentos( lancamentos );
			} else if (lancamentos != null) {
				dto.setLancamentos(Arrays.asList(lancamentos.get(0)));
				mapLancamentosPorValor.get(Double.valueOf(dto.getValor())).remove(0);
			}
		}
		
		
	}
    
}
