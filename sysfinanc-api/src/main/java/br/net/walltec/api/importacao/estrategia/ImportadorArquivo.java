package br.net.walltec.api.importacao.estrategia;

import java.util.List;

import br.net.walltec.api.dto.RegistroExtratoDto;
import br.net.walltec.api.excecoes.WalltecException;
import br.net.walltec.api.vo.LancamentoVO;

public interface ImportadorArquivo {

    List<RegistroExtratoDto> importar(String nomeArquivo, byte[] dadosArquivo, List<LancamentoVO> listaParcelas) throws WalltecException;
}
