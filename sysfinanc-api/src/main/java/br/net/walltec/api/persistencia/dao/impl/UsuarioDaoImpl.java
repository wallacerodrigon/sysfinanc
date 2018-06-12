package br.net.walltec.api.persistencia.dao.impl;


import br.net.walltec.api.entidades.Usuario;
import br.net.walltec.api.excecoes.PersistenciaException;
import br.net.walltec.api.persistencia.dao.UsuarioDao;
import br.net.walltec.api.persistencia.dao.comum.AbstractPersistenciaPadraoDao;


import javax.inject.Inject;
import javax.inject.Named;
import javax.persistence.EntityManager;

@Named
public class UsuarioDaoImpl  extends AbstractPersistenciaPadraoDao<Usuario> implements UsuarioDao {

    @Inject
    private EntityManager em;

	public UsuarioDaoImpl(EntityManager em) {
		super(em);
	}

	public Usuario recuperarUsuario(String login, String senha) throws PersistenciaException {
		Usuario filtro = new Usuario();
		filtro.setLogin(login);
		filtro.setSenha(senha);
		System.out.println(senha);
		Usuario usuario = pesquisar(filtro);
		
		if (usuario != null && usuario.getId() != null){
			return usuario;
		}
		
		return new Usuario();
	}

	
}
