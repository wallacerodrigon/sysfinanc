package br.net.walltec.api.importacao.estrategia;

import java.io.BufferedReader;
import java.io.FileReader;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

public class ImportaCSVBB {

	public static final String DATA = "dd/MM/yyyy";	
	
	public static void importarArquivo() throws Exception {
		
		String file = "c:\\temp\\extrato-setembro.csv";
		
		BufferedReader reader = new BufferedReader(new FileReader(file));
		String linha = null;
				
		int numLinha = 0;
		
		System.out.println("insert into lancamento(co_conta,nu_parcela,dt_vencimento,va_parcela,co_formapagamento,no_descricao,bolpaga,bolconciliado,numdocumento) values");
		while ( (linha = reader.readLine()) != null) {
			
			if (numLinha == 0) {
				++numLinha;
				continue;
			}
			String linha2 = linha.replaceAll("\"", "");
			String dados[] = linha2.split(",");
			
			Date dataVencimento = getData(dados[0].replace("\"", ""), "dd/MM/yyyy");
			String dataMysql = getDataFormatoString(dataVencimento, "yyyy-MM-dd");
			
			String conta = dados[5].startsWith("-") ? "152" : "736";
			String valor = dados[5].replaceAll("[-]", "");
			
			System.out.println("(" + conta + ",1,'"+ dataMysql+"',"+valor+",34,'" + dados[2]  + "', 1, 1, '" + dados[4] + "'),");
			++numLinha;
		}
		
		reader.close();
	}	
	
	public static Date getData(String data, String formato) {
		DateFormat df = new SimpleDateFormat(formato);
		try {
			return df.parse(data);
		} catch (ParseException e) {
			e.printStackTrace();
		}
		return null;
	}
	
	/**
	 * @return Retorna a data no formato dd/mm/yyyy.
	 */
	public static String getDataFormatoString(Date data) {
		return data==null ? null : new SimpleDateFormat(DATA).format(data);
	}

	/**
	 * @return Retorna a data no formato dd/mm/yyyy.
	 */
	public static String getDataFormatoString(Date data, String formato) {
		return new SimpleDateFormat(formato).format(data);
	}
	

	public static void main(String[] args) throws Exception {
		ImportaCSVBB.importarArquivo();
	}
	
}
