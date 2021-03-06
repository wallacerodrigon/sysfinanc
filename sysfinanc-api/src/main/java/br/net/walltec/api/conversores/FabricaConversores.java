package br.net.walltec.api.conversores;



import java.util.HashMap;
import java.util.Map;

import br.net.walltec.api.entidades.Conta;
import br.net.walltec.api.entidades.Lancamento;
import br.net.walltec.api.entidades.TipoConta;
import br.net.walltec.api.entidades.Usuario;
import br.net.walltec.api.entidades.comum.EntidadeBasica;
import br.net.walltec.api.excecoes.ConversorNaoExistenteException;


public class FabricaConversores {

	private static FabricaConversores instance = new FabricaConversores();
	
	@SuppressWarnings("rawtypes")
	private static Map<Class<? extends EntidadeBasica>, AbstractConverter> mapa = new HashMap<Class<? extends EntidadeBasica>, AbstractConverter>();
	
	private FabricaConversores(){}

	
	static {
		mapa.put(Conta.class, new ConversorConta());
		mapa.put(Lancamento.class, new ConversorLancamento());
		mapa.put(Usuario.class, new ConversorUsuario());
		mapa.put(TipoConta.class, new ConversorTipoConta());
	}
	
	public static FabricaConversores getInstance(){
		return instance;
	}
	
	@SuppressWarnings("unchecked")
	public <T,V>ConversorPadrao<T, V> criarConversor(Class<T> classeDaEntidade, Class<V> classeVO) throws ConversorNaoExistenteException {
		if (mapa.containsKey(classeDaEntidade) && mapa.get(classeDaEntidade) instanceof ConversorPadrao ){
			return mapa.get(classeDaEntidade);
		} else {
			throw new ConversorNaoExistenteException("Conversor não existente [" + classeDaEntidade.getName() + "]");
		}
		
	}
	
}
