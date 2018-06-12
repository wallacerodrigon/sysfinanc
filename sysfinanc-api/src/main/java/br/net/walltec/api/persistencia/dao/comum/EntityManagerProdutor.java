package br.net.walltec.api.persistencia.dao.comum;



import java.util.logging.Logger;

import javax.enterprise.context.ApplicationScoped;
import javax.enterprise.context.RequestScoped;
import javax.enterprise.inject.Default;
import javax.enterprise.inject.Disposes;
import javax.enterprise.inject.Produces;
import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;

import br.net.walltec.api.utilitarios.Constantes;


@ApplicationScoped
public class EntityManagerProdutor {
	
	private static final EntityManagerFactory emf = Persistence.createEntityManagerFactory( Constantes.PERSISTENCE_UNIT );
	//private static final EntityManagerFactory emf2 = Persistence.createEntityManagerFactory( "puSysfinanc2" );
	
	private Logger log = Logger.getLogger(getClass().getSimpleName());
    
	@Produces 
    @RequestScoped
    @Default
	public EntityManager createEntityManager() {
	  log.info("criando em");
	  return emf.createEntityManager();
	}
	
//	@Produces 
//    @RequestScoped	
//	@ProdutorControleFinanceiro
//	public EntityManager createEntityManager2() {
//		  log.info("criando em");
//		  return emf2.createEntityManager();
//		}	

	/**
	 * @return
	 */
	protected String getPersistenceUnit() {
		return Constantes.PERSISTENCE_UNIT;
	}
	
	public void close(@Disposes EntityManager em) {
		 log.info("fechando em");
	     em.close();
	}	
}
