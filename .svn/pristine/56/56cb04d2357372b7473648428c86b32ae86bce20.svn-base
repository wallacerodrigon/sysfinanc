/**
 * 
 */
package br.net.walltec.api.negocio.servicos;

import br.net.walltec.api.dto.RecuperaUsuarioLoginSenhaDto;
import br.net.walltec.api.entidades.Usuario;
import br.net.walltec.api.excecoes.NegocioException;
import br.net.walltec.api.negocio.servicos.comum.CrudPadraoServico;
import br.net.walltec.api.vo.UsuarioVO;

/**
 * @author wallace
 *
 */
public interface UsuarioServico extends CrudPadraoServico<Usuario, UsuarioVO> {

    UsuarioVO recuperarUsuarioPorLoginSenha(RecuperaUsuarioLoginSenhaDto dto) throws NegocioException;

    String montarSenhaSegura(String senha);

}
