package br.net.walltec.api.rest.comum;



import javax.ws.rs.ApplicationPath;
import javax.ws.rs.core.Application;

import io.swagger.annotations.Api;
import io.swagger.jaxrs.config.BeanConfig;

/**
 * ativador do Rest
 * @author wallace
 *
 */
 @Api(value="Sysfinanc API")
@ApplicationPath("/rest")
public class JaxRsAtivador extends Application {

	public JaxRsAtivador() {
		BeanConfig conf = new BeanConfig();
		conf.setTitle("Sysfinanc API");
	    conf.setDescription("Consulta aos lançamentos financeiros pessoais do Sysfinanc");
	    conf.setVersion("1.0.0");
	    conf.setBasePath("/sysfinanc-api/rest");
	    conf.setSchemes(new String[] { "http"});
	    conf.setResourcePackage("br.net.walltec.api.rest");		
		conf.setScan(true);
		conf.setContact("wallacerodrigon@gmail.com");
		conf.setPrettyPrint(true);
		conf.setTermsOfServiceUrl("API exclusiva para uso por walltec.net.br");
	}
}
