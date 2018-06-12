/**
 * 
 */
package br.net.walltec.api.negocio.servicos.impl;

import javax.annotation.PostConstruct;
import javax.inject.Inject;
import javax.inject.Named;
import javax.persistence.EntityManager;
import javax.persistence.NoResultException;

import br.net.walltec.api.dto.RecuperaUsuarioLoginSenhaDto;
import br.net.walltec.api.entidades.Usuario;
import br.net.walltec.api.excecoes.NegocioException;
import br.net.walltec.api.excecoes.PersistenciaException;
import br.net.walltec.api.excecoes.RegistroNaoEncontradoException;
import br.net.walltec.api.negocio.servicos.AbstractCrudServicoPadrao;
import br.net.walltec.api.negocio.servicos.UsuarioServico;
import br.net.walltec.api.persistencia.dao.UsuarioDao;
import br.net.walltec.api.persistencia.dao.impl.UsuarioDaoImpl;
import br.net.walltec.api.tokens.TokenManager;
import br.net.walltec.api.utilitarios.UtilCriptografia;
import br.net.walltec.api.vo.UsuarioVO;
import com.sun.mail.smtp.DigestMD5;
import jdk.nashorn.internal.parser.Token;

/**
 * @author wallace
 *
 */
@Named
public class UsuarioServicoImpl extends AbstractCrudServicoPadrao<Usuario, UsuarioVO> implements UsuarioServico {

	@Inject
	private EntityManager em;

	private UsuarioDao usuarioDao;
	
	@PostConstruct
	public void init(){
		usuarioDao = new UsuarioDaoImpl(em);
	}


	/* (non-Javadoc)
	 * @see br.net.walltec.api.negocio.servicos.AbstractCrudServicoPadrao#getClasseEntidade()
	 */
	@Override
	protected Class getClasseEntidade() {
		// TODO Auto-generated method stub
		return Usuario.class;
	}


	/* (non-Javadoc)
	 * @see br.net.walltec.api.negocio.servicos.AbstractCrudServicoPadrao#getClassePojo()
	 */
	@Override
	protected Class getClassePojo() {
		// TODO Auto-generated method stub
		return UsuarioVO.class;
	}


	@Override
	public UsuarioVO recuperarUsuarioPorLoginSenha(RecuperaUsuarioLoginSenhaDto dto) throws NegocioException {
	//	ValidadorCampoObrigatorio.validarCamposInformados(new String[]{"Login", "Senha"}, dto.getLogin(), dto.getSenha());

		try {
			//criptografar a senha para comparar

			Usuario u = usuarioDao.recuperarUsuario(dto.getLogin(), UtilCriptografia.criptografa(dto.getSenha()));
			UsuarioVO vo = new UsuarioVO();
			vo.setLogin(u.getLogin());
			vo.setNome(u.getNome());
			vo.setToken(new TokenManager().gerarToken(u.getId()));
			return vo;
		} catch(NoResultException e) {
			throw new RegistroNaoEncontradoException(e);
		} catch (Exception e) {
			throw new NegocioException(e);
		}
	}


	@Override
	public String montarSenhaSegura(String senha) {
		StringBuffer buffer = new StringBuffer(senha);
		String novaStringRevertida = buffer.reverse().toString();
		try {
            novaStringRevertida = UtilCriptografia.criptografa(novaStringRevertida);
			return novaStringRevertida;
		} catch (Exception e) {
			return "[erro: algoritmo não encontrado]";
		}
	}
}
