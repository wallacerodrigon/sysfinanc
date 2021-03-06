package br.net.walltec.api.conversores;

import java.util.Date;

import br.net.walltec.api.entidades.Conta;
import br.net.walltec.api.entidades.TipoConta;
import br.net.walltec.api.entidades.Usuario;
import br.net.walltec.api.utilitarios.UtilData;
import br.net.walltec.api.vo.RubricaVO;

public class ConversorConta extends AbstractConverter<Conta, RubricaVO> {

    @Override
    public Conta converterPojoParaEntidade(RubricaVO pojo) {
        Conta conta = super.converterPojoParaEntidade(pojo);

        conta.setId(pojo.getId());
        conta.setTipoConta(new TipoConta());
        conta.getTipoConta().setId(pojo.getIdTipoConta());
        conta.setDataCadastro(pojo.getDataCadastroStr() != null ?  
        							UtilData.getData(pojo.getDataCadastroStr(), UtilData.SEPARADOR_PADRAO): new Date());
        conta.setUsuario(new Usuario());
        conta.getUsuario().setId(1);
        return conta;
    }

    @Override
    public RubricaVO converterEntidadeParaPojo(Conta entidade) {
        RubricaVO vo = super.converterEntidadeParaPojo(entidade);
        
        vo.setId(entidade.getId());
        vo.setIdTipoConta(entidade.getTipoConta().getId());
        vo.setDataCadastroStr(UtilData.getDataFormatada(entidade.getDataCadastro()));
        vo.setDescTipoConta(entidade.getTipoConta().getDescricao());

        return vo;
    }
}
