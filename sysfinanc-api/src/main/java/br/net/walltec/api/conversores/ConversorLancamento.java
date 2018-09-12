package br.net.walltec.api.conversores;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.util.zip.ZipEntry;
import java.util.zip.ZipInputStream;

import br.net.walltec.api.entidades.Conta;
import br.net.walltec.api.entidades.FormaPagamento;
import br.net.walltec.api.entidades.Lancamento;
import br.net.walltec.api.utilitarios.Constantes;
import br.net.walltec.api.utilitarios.UtilData;
import br.net.walltec.api.utilitarios.UtilFormatador;
import br.net.walltec.api.vo.LancamentoVO;

public class ConversorLancamento extends AbstractConverter<Lancamento, LancamentoVO> {

    @Override
    public LancamentoVO converterEntidadeParaPojo(Lancamento entidade) {
        LancamentoVO lancamentoVO = super.converterEntidadeParaPojo(entidade);

        lancamentoVO.setDescConta(entidade.getConta().getDescricao());
        lancamentoVO.setIdConta(entidade.getConta().getId());
        lancamentoVO.setIdParcelaOrigem(entidade.getLancamentoOrigem() != null ? entidade.getLancamentoOrigem().getId() : null);
        lancamentoVO.setDataVencimentoStr(UtilData.getDataFormatada(entidade.getDataVencimento()) );
        lancamentoVO.setDespesa(entidade.getConta().getDespesa());
        lancamentoVO.setValorCreditoStr( lancamentoVO.isDespesa() ? "0,00" :
                UtilFormatador.formatarDecimal(entidade.getValor()));
        lancamentoVO.setValorDebitoStr( lancamentoVO.isDespesa() ? 
                UtilFormatador.formatarDecimal(entidade.getValor()) : "0,00");
        lancamentoVO.setBolConciliado(entidade.getBolConciliado() ==null ? false : entidade.getBolConciliado());
        lancamentoVO.setId(entidade.getId());
        lancamentoVO.setNumero(entidade.getNumero());
        return lancamentoVO;
    }

    @Override
    public Lancamento converterPojoParaEntidade(LancamentoVO pojo) {
        Lancamento lancamento = super.converterPojoParaEntidade(pojo);

        lancamento.setId(pojo.getId());
        lancamento.setConta(new Conta());
        lancamento.getConta().setId(pojo.getIdConta());
        lancamento.getConta().setDespesa(pojo.isDespesa());

        if (pojo.getIdParcelaOrigem() != null){
            lancamento.setLancamentoOrigem(new Lancamento());
            lancamento.getLancamentoOrigem().setId(pojo.getIdParcelaOrigem());
        }
        lancamento.setFormaPagamento(new FormaPagamento());
        lancamento.getFormaPagamento().setId(Constantes.ID_FORMA_PAGAMENTO_PADRAO);
        lancamento.setDataVencimento( UtilData.getData(pojo.getDataVencimentoStr(), UtilData.SEPARADOR_PADRAO)  );
        lancamento.setValor( pojo.isDespesa() ? 
        						UtilFormatador.formatarStringComoValor(pojo.getValorDebitoStr()) : 
        							UtilFormatador.formatarStringComoValor(pojo.getValorCreditoStr())  );
        return lancamento;
    }
    
//    public static void main(String[] args) throws Exception {
//    	ZipInputStream arquivoZip = new ZipInputStream(new FileInputStream("C:\\TEMP\\eDNE_Basico.zip"));
//    	ZipEntry entrada = null;
//    	while( (entrada = arquivoZip.getNextEntry()) != null) {
//    		if (entrada.getName().toLowerCase().startsWith("fixo") && entrada.getName().toLowerCase().endsWith(".txt") ) {
//	    		File f = new File("c:\\temp\\dist\\"+entrada.getName());
//				FileOutputStream fos = new FileOutputStream(f);
//				int bytes = 0;
//				byte[] b = new byte[1024];
//				while( (bytes = arquivoZip.read(b, 0, 1024)) != -1) {
//					fos.write(b, 0, bytes);
//				}
//				fos.flush();
//				fos.close();
//    		}
//    	}
//    	arquivoZip.close();
//    	System.out.println("Finalizado");
//	}
}
