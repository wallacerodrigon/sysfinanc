package br.net.walltec.api.persistencia.dao;

import br.net.walltec.api.entidades.Usuario;
import br.net.walltec.api.excecoes.PersistenciaException;
import br.net.walltec.api.persistencia.dao.comum.PersistenciaPadraoDao;


public interface UsuarioDao extends PersistenciaPadraoDao<Usuario> {

	Usuario recuperarUsuario(String login, String senha) throws PersistenciaException;
}
