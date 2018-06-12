package br.net.walltec.api.importacao.estrategia;

import br.net.walltec.api.dto.RegistroExtratoDto;
import br.net.walltec.api.excecoes.WalltecException;

import java.util.List;

public interface ImportadorArquivo {

    List<RegistroExtratoDto> importar(String nomeArquivo, byte[] dadosArquivo) throws WalltecException;
}
