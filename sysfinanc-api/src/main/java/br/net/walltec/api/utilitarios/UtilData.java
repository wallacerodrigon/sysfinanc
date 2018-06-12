/**
 * 
 */
package br.net.walltec.api.utilitarios;

/**
 *
 */

		import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.Period;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.time.temporal.ChronoUnit;
import java.util.Calendar;
import java.util.Date;

/**
 * @author wallace
 *
 */
public class UtilData {

	public static final String SEPARADOR_PADRAO = "/";

    private static ZoneId zone = ZoneId.of("Brazil/East");

	public static final String PATTERN_DATA_BR = "dd/MM/yyyy";

	private static final String PATTERN_DATA_HORA_BR = PATTERN_DATA_BR + " HH:mm:ss";

	public static Date asDate(LocalDate localDate) {
		return Date.from(localDate.atStartOfDay().atZone(zone).toInstant());
	}

	public static Date asDate(LocalDateTime localDateTime) {
		return Date.from(localDateTime.atZone(zone).toInstant());
	}

	public static Date createData(Long timeInMiliseconds){
		return new Date(timeInMiliseconds);
	}

	public static Date somarData(int quantidade, ChronoUnit unidade) {
		return somarData(new Date(), quantidade, unidade);
	}

	public static Date somarData(Date dataBase, int quantidade, ChronoUnit unidade) {
		LocalDate data = UtilData.getLocalDate(dataBase);
		LocalDate dataCalculada = data.plus(quantidade, unidade);
		Date asDate = UtilData.asDate(dataCalculada);
		return asDate;
	}


	/**
	 * @param entidade
	 * @param pojo
	 */
	public static String getDataFormatada(Date data) {
		if (data != null) {
			DateTimeFormatter formatador =
					DateTimeFormatter.ofPattern(PATTERN_DATA_BR);
			return getLocalDate(data).format(formatador); //08/04/2014
		} else {
			return null;
		}
	}

	public static String getDataFormatada(Date data, String pattern) {
		if (data != null) {
			DateTimeFormatter formatador =
					DateTimeFormatter.ofPattern(pattern);
			return getLocalDate(data).format(formatador); //08/04/2014
		} else {
			return null;
		}
	}

	public static String getDataHoraFormatada(Date data) {
		DateTimeFormatter formatador =
				DateTimeFormatter.ofPattern(PATTERN_DATA_HORA_BR);
		return getLocalDateTime(data).format(formatador); //08/04/2014
	}

	/**
	 * @param data
	 * @return
	 */
	private static LocalDateTime getLocalDateTime(Date data) {
		return data.toInstant().atZone(ZoneId.systemDefault()).toLocalDateTime();
	}

	public static Date getData(String data, String separador){
		String camposData[] = data.split(separador);

		Calendar hoje = Calendar.getInstance();
		hoje.set(Integer.valueOf(camposData[2]), Integer.valueOf(camposData[1])-1, Integer.valueOf(camposData[0]), 0, 0);
		return hoje.getTime();
	}


	/**
	 * @param data
	 * @return
	 */
	public static LocalDate getLocalDate(Date data) {
		
		return LocalDate.of(UtilData.getAno(data), UtilData.getMes(data), UtilData.getDia(data));
	}

	public static LocalDateTime getLocalDateZeroHoras(Date data) {
		LocalDateTime localDateComHoras = getLocalDateTime(data);
		localDateComHoras
			.withHour(0)
			.withMinute(0)
			.withSecond(0);
		return localDateComHoras;
	}

	public static Date getDataSemHoras(Date data) {
		Calendar calendar = Calendar.getInstance();
		calendar.setTime(data);
		calendar.set(Calendar.HOUR_OF_DAY, 0);
		calendar.set(Calendar.MINUTE, 0);
		calendar.set(Calendar.SECOND, 0);
		calendar.set(Calendar.MILLISECOND, 0);

		return calendar.getTime();
	}

	public static Date createDataSemHoras(int dia, int mes, int ano) {
		Calendar calendar = Calendar.getInstance();
		calendar.set(Calendar.HOUR_OF_DAY, 0);
		calendar.set(Calendar.MINUTE, 0);
		calendar.set(Calendar.SECOND, 0);
		calendar.set(Calendar.MILLISECOND, 0);
		calendar.set(Calendar.DAY_OF_MONTH, dia);
		calendar.set(Calendar.MONTH, mes - 1);
		calendar.set(Calendar.YEAR, ano);

		return calendar.getTime();
	}


	public static int getMes(Date data) {
		Calendar calendar = Calendar.getInstance();
		calendar.setTime(data);
		return calendar.get( Calendar.MONTH)+1;
	}

	public static int getAno(Date data) {
		Calendar calendar = Calendar.getInstance();
		calendar.setTime(data);
		return calendar.get( Calendar.YEAR);
	}

	public static int getDia(Date data) {
		Calendar calendar = Calendar.getInstance();
		calendar.setTime(data);
		return calendar.get( Calendar.DAY_OF_MONTH);
	}

	public static boolean isDataMaior(Date dataBase, Date dataParametro) {
		return UtilData.getLocalDateZeroHoras(dataBase).isAfter( UtilData.getLocalDateZeroHoras(dataParametro) );

	}

	public static boolean isIgual(Date dataBase, Date dataParametro) {
		return UtilData.getLocalDateZeroHoras(dataBase).isEqual( UtilData.getLocalDateZeroHoras(dataParametro) );

	}

	public static int getDiasDiferenca(Date data1, Date data2) {
		Period periodo = Period.between(getLocalDate(data1), getLocalDate(data2));
		return (periodo.getMonths() * 30)+periodo.getDays();
	}
	
	public static LocalDate getUltimaDataMes(int mes, int ano) {
		LocalDate localDate = LocalDate.of(ano, mes, 1); 
		int qtdDiasMes = localDate.lengthOfMonth();
		return LocalDate.of(ano, localDate.getMonth(), qtdDiasMes);
	}
	
	public static Date getUltimaDataMes(Date dataBase) {
		LocalDate dataFimMes = getUltimaDataMes(getMes(dataBase), getAno(dataBase));
		return asDate(dataFimMes);
	}
	

	public static Date getPrimeiroDiaMes(Date dataBase) {
		int mes = UtilData.getMes(dataBase);
		return createDataSemHoras(1, mes, dataBase.getYear());
	}

}
