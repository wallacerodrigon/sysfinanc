/**
 * 
 */
package br.net.walltec.api.vo;

import com.thoughtworks.xstream.XStream;
import com.thoughtworks.xstream.io.xml.StaxDriver;

/**
 * @author wallace
 *
 */
public class TesteLeitorXML {
	
	public String gerarXml() throws Exception {
		RubricaVO vo = new RubricaVO();
		vo.setDescricao("Compras da semana");
		vo.setDescTipoConta("descTipoConta");
		vo.setDespesa(true);
		vo.setId(1);
		vo.setIdTipoConta(12);
		
		XStream xStream = new XStream();
		//xStream.alias("rubricaVO", RubricaVO.class);
		return xStream.toXML(vo);
		
	}
	
	public void lerXml(String xml) throws Exception {
		RubricaVO vo = (RubricaVO) new XStream(new StaxDriver()).fromXML(xml, RubricaVO.class);
		System.out.println(vo);
	}
	
	public static void main(String[] args) throws Exception {
		TesteLeitorXML leitor = new TesteLeitorXML();
		String x = leitor.gerarXml();
		leitor.lerXml(x);
		
		System.out.println(x);;
	}

}
