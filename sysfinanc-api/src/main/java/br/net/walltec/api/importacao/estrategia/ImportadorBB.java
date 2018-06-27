package br.net.walltec.api.importacao.estrategia;

import java.nio.charset.Charset;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import br.net.walltec.api.dto.RegistroExtratoDto;
import br.net.walltec.api.excecoes.WalltecException;

public class ImportadorBB implements ImportadorArquivo {
    @Override
    public List<RegistroExtratoDto> importar(String nomeArquivo, byte[] dadosArquivo) throws WalltecException {
        String[] linhas = new String(dadosArquivo, Charset.forName("ISO-8859-1")).split("\n");
        List<RegistroExtratoDto> dtos = Stream.of(linhas)
   	    	  .skip(9)
   	          .map(linha -> {
  	        	    RegistroExtratoDto dto = new RegistroExtratoDto();
					dto.setDataLancamento(linha.substring(0,8));
					dto.setHistorico(linha.substring(17, 43).trim());
					dto.setDocumento(linha.substring(43, 66).trim());
					dto.setValor( linha.substring(67,78).trim() );
					dto.setCreditoDebito( linha.substring(79, 80).trim() );
					return dto;
   	          })
   	          .filter(dto -> dto.getDataLancamento().matches("[0-9]{2}[/][0-9]{2}[/][0-9]{2}") && (dto.getCreditoDebito().trim().equalsIgnoreCase("C") || dto.getCreditoDebito().trim().equalsIgnoreCase("D")) )
   	          .collect(Collectors.toList());
        return dtos;
    }
    
    
}
