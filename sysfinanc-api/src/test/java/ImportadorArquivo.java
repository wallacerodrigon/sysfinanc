import br.net.walltec.api.dto.RegistroExtratoDto;
import br.net.walltec.api.importacao.estrategia.ImportadorBB;

import java.io.BufferedReader;
import java.io.FileReader;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Stream;

public class ImportadorArquivo {

    public static void main(String ...args) throws Exception {
        List<RegistroExtratoDto> dtos = new ImportadorBB().importar("c:\\temp\\extrato.txt", null);
        dtos.stream().forEach(dto -> System.out.println(dto.getHistorico()));
    }
}
