package br.net.walltec.api.rest.comum;



import javax.ws.rs.ApplicationPath;
import javax.ws.rs.core.Application;

/**
 * ativador do Rest
 * @author wallace
 *
 */
 @Api(value="Localidade API")
@ApplicationPath("/rest")
public class JaxRsAtivador extends Application {

	public JaxRsAtivador() {
		BeanConfig conf = new BeanConfig();
		conf.setTitle("Sysfinanc API");
	    conf.setDescription("Consulta aos lançamentos financeiros pessoais do Sysfinanc");
	    conf.setVersion("1.0.0");
	    conf.setBasePath("/sysfinanc-api/rest");
	    conf.setSchemes(new String[] { "http"});
	    conf.setResourcePackage(LancamentosRest.class.getPackage().getName());		
		conf.setScan(true);
		conf.setContact("wallacerodrigon@gmail.com");
		conf.setPrettyPrint(true);
		conf.setTermsOfServiceUrl("API exclusiva para uso por walltec.net.br");
	}
}
