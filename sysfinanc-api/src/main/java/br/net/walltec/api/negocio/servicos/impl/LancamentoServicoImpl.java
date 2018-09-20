package br.net.walltec.api.negocio.servicos.impl;

import java.io.Serializable;
import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Comparator;
import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Set;
import java.util.logging.Logger;
import java.util.stream.Collectors;

import javax.annotation.PostConstruct;
import javax.inject.Inject;
import javax.inject.Named;
import javax.persistence.EntityManager;
import javax.persistence.NoResultException;
import javax.transaction.Transactional;
import javax.transaction.Transactional.TxType;

import br.net.walltec.api.dto.FiltraParcelasDto;
import br.net.walltec.api.dto.GeracaoParcelasDto;
import br.net.walltec.api.dto.MapaDashboardDTO;
import br.net.walltec.api.dto.RegistroExtratoDto;
import br.net.walltec.api.dto.ResumoDetalhadoMesAnoDTO;
import br.net.walltec.api.dto.ResumoMesAnoDTO;
import br.net.walltec.api.dto.RubricaMesAnoDTO;
import br.net.walltec.api.dto.UtilizacaoParcelasDto;
import br.net.walltec.api.entidades.Conta;
import br.net.walltec.api.entidades.FechamentoContabil;
import br.net.walltec.api.entidades.FormaPagamento;
import br.net.walltec.api.entidades.Lancamento;
import br.net.walltec.api.excecoes.CampoObrigatorioException;
import br.net.walltec.api.excecoes.NegocioException;
import br.net.walltec.api.excecoes.PersistenciaException;
import br.net.walltec.api.excecoes.WebServiceException;
import br.net.walltec.api.negocio.servicos.AbstractCrudServicoPadrao;
import br.net.walltec.api.negocio.servicos.LancamentoServico;
import br.net.walltec.api.persistencia.dao.ContaDao;
import br.net.walltec.api.persistencia.dao.FechamentoContabilDao;
import br.net.walltec.api.persistencia.dao.LancamentoDao;
import br.net.walltec.api.persistencia.dao.impl.ContaDaoImpl;
import br.net.walltec.api.persistencia.dao.impl.FechamentoContabilDaoImpl;
import br.net.walltec.api.persistencia.dao.impl.LancamentoDaoImpl;
import br.net.walltec.api.rest.dto.filtro.DesfazimentoConciliacaoDTO;
import br.net.walltec.api.rest.dto.filtro.RegistroFechamentoMesDTO;
import br.net.walltec.api.utilitarios.UtilData;
import br.net.walltec.api.utilitarios.UtilFormatador;
import br.net.walltec.api.vo.LancamentoVO;
import br.net.walltec.api.vo.UtilizacaoLancamentoVO;

@Named
public class LancamentoServicoImpl extends AbstractCrudServicoPadrao<Lancamento, LancamentoVO> implements LancamentoServico {

    @Inject
    private EntityManager em;

    private ContaDao contaDao;

    private LancamentoDao lancamentoDao;
    
    private FechamentoContabilDao fechamentoContabilDao;
    
    private Logger log = Logger.getLogger(this.getClass().getName());

    @PostConstruct
    public void init() {
        contaDao = new ContaDaoImpl(em);
        lancamentoDao = new LancamentoDaoImpl(em);
        fechamentoContabilDao = new FechamentoContabilDaoImpl(em);
        setDao(lancamentoDao);
    }

    @Override
    protected Class getClasseEntidade() {
        return Lancamento.class;
    }

    @Override
    protected Class getClassePojo() {
        return LancamentoVO.class;
    }
    
    /* (non-Javadoc)
     * @see br.net.walltec.api.negocio.servicos.AbstractCrudServicoPadrao#alterarVO(br.net.walltec.api.vo.GerenciadorPadraoVO)
     */
    @Override
    public LancamentoVO alterarVO(LancamentoVO objeto) throws NegocioException {
    	Lancamento lancamento = (Lancamento) getConversor().converterPojoParaEntidade(objeto);
    	
    	Lancamento lancBanco = this.find(objeto.getId());
    	
    	lancamento.setFormaPagamento(lancBanco.getFormaPagamento());
    	lancamento.getFormaPagamento().setId(objeto.getIdFormaPagamento());
    	
    	this.alterar(lancamento);
    	
    	return (LancamentoVO) getConversor().converterEntidadeParaPojo(lancamento);
    }

    @Override
    public List<LancamentoVO> listarParcelas(FiltraParcelasDto dtoFiltro) throws NegocioException {
        if (dtoFiltro == null) {
            throw new CampoObrigatorioException("Filtro não informado");
        }
        if (dtoFiltro.getMes() == null && dtoFiltro.getAno() == null && dtoFiltro.getIdConta() == null && dtoFiltro.getIdParcelaOrigem() == null){
        	throw new CampoObrigatorioException("Parâmetros dos filtros não foram informados");
        }
        
        try {
        	List<Lancamento> listaParcelas = filtrarParcelas(dtoFiltro);
			return getConversor().converterEntidadeParaPojo(listaParcelas);
        } catch (PersistenciaException e) {
            throw new NegocioException(e);
        }
    }

	private List<Lancamento> filtrarParcelas(FiltraParcelasDto dtoFiltro) throws PersistenciaException {
		Date dataInicial = null;
		Date dataFinal = null;
		if (dtoFiltro.getMes() != null && dtoFiltro.getAno() != null) {
			dataInicial = UtilData.createDataSemHoras(1, dtoFiltro.getMes(), dtoFiltro.getAno());
			dataFinal   = UtilData.asDate(UtilData.getUltimaDataMes(dtoFiltro.getMes(), dtoFiltro.getAno()));
		}
		return lancamentoDao.listarParcelas(dataInicial, dataFinal, dtoFiltro.getIdConta(), dtoFiltro.getIdParcelaOrigem());
	}

    @Override
    public boolean baixarParcelas(List<Integer> idsLancamentos) throws NegocioException {
        if (idsLancamentos == null || idsLancamentos.size() == 0){
            throw new CampoObrigatorioException("Lista de lancamentos não informada!");
        }
        try {
            for(Integer idLancamento : idsLancamentos) {
            	Lancamento lancBanco = this.find(idLancamento);
            	lancBanco.setBolPaga(true);
            	this.alterar(lancBanco);
            }
            return true;
        } catch (Exception e) {
            throw new NegocioException(e);
        }

    }

    @Override
    public boolean excluirParcelas(List<Integer> idsLancamentos) throws NegocioException {
        if (idsLancamentos == null || idsLancamentos.size() == 0){
            throw new CampoObrigatorioException("Lista de lancamentos não informada!");
        }
        try {
            for(Integer idLancamento : idsLancamentos) {
            	this.excluir(idLancamento);
            }
            return true;
        } catch (Exception e) {
            throw new NegocioException(e);
        }
    }
    
    /* (non-Javadoc)
     * @see br.net.walltec.api.negocio.servicos.AbstractCrudServicoPadrao#excluir(java.io.Serializable)
     */
    @Override
    public void excluir(Serializable id) throws NegocioException {
    	Lancamento l = this.find(id);
    	l.setValor(BigDecimal.ZERO);
    	l.setDataVencimento(new Date(0));
    	this.alterar(l);
    }

    @Override
    public List<LancamentoVO> utilizarLancamento(UtilizacaoParcelasDto dtoUtilizacao) throws NegocioException {
        Lancamento lancamento = null;
        try {
            lancamento = lancamentoDao.find(dtoUtilizacao.getIdLancamentoOrigem());

            BigDecimal novoValor = lancamento.getValor().subtract(dtoUtilizacao.getValorUtilizado());
            lancamento.setValor(novoValor);
            lancamento.setBolConciliado(false);
            lancamentoDao.alterar(lancamento);

                //incluir uma nova lancamento utilizando a de origem
            Lancamento lancamentoIncluido = incluirUtilizacaoParcela(lancamento, dtoUtilizacao);
            return Arrays.asList( 
            			getFabricaConversor().criarConversor(Lancamento.class, LancamentoVO.class).converterEntidadeParaPojo(lancamento),
            			getFabricaConversor().criarConversor(Lancamento.class, LancamentoVO.class).converterEntidadeParaPojo(lancamentoIncluido));
        } catch (PersistenciaException e) {
            throw new NegocioException(e);
        }
    }

    private Lancamento incluirUtilizacaoParcela(Lancamento lancamentoOrigem, UtilizacaoParcelasDto dtoUso) throws NegocioException {
    	
        Lancamento lancamentoUtilizada = new Lancamento();
        lancamentoUtilizada.setBolPaga(true);
        lancamentoUtilizada.setConta(lancamentoOrigem.getConta());
        lancamentoUtilizada.setDataVencimento(UtilData.getData(dtoUso.getDataUtilizacaoStr(), UtilData.SEPARADOR_PADRAO));
        lancamentoUtilizada.setDescricao(lancamentoOrigem.getDescricao());
        lancamentoUtilizada.setFormaPagamento(new FormaPagamento());
        lancamentoUtilizada.getFormaPagamento().setId(dtoUso.getIdFormaPagamento());
        
        lancamentoUtilizada.setNumero( obterProximoNumero(lancamentoOrigem) );
        lancamentoUtilizada.setLancamentoOrigem(lancamentoOrigem);
        lancamentoUtilizada.setValor(dtoUso.getValorUtilizado());
        lancamentoUtilizada.setBolConciliado(false);
        try {
			return lancamentoDao.incluir(lancamentoUtilizada);
		} catch (PersistenciaException e) {
			throw new NegocioException(e);
		}
    }

    /**
	 * @param lancamentoOrigem
	 * @return
     * @throws NegocioException 
	 */
	private Short obterProximoNumero(Lancamento lancamentoOrigem) throws NegocioException {
		List<UtilizacaoLancamentoVO> usos = this.listarHistoricoUso(lancamentoOrigem.getId());
		if (usos == null || usos.isEmpty()) {
			return Short.valueOf("1");
		} else {
			final Comparator<UtilizacaoLancamentoVO> comp = (vo1, vo2) -> vo1.getNumeroParcela().compareTo(vo2.getNumeroParcela());
			UtilizacaoLancamentoVO utilizacaoLancamentoVO = usos.stream().max(comp).get();
			return Integer.valueOf(utilizacaoLancamentoVO.getNumeroParcela()+1).shortValue();
		}
	}

	@Override
    public List<UtilizacaoLancamentoVO> listarHistoricoUso(Integer idLancamento) throws NegocioException {
		try {
			return lancamentoDao.listarUsos(idLancamento);
		} catch (PersistenciaException e) {
			throw new NegocioException(e);
		}

    }

	@Transactional(value= Transactional.TxType.REQUIRES_NEW)
    private boolean baixarLancamento(LancamentoVO lancamentoVo) throws PersistenciaException {
        Lancamento p = lancamentoDao.find(lancamentoVo.getId());
        p.setBolPaga(true);
        lancamentoDao.alterar(p);
        return true;
    }

	/* (non-Javadoc)
	 * @see br.net.walltec.api.negocio.servicos.LancamentoServico#gerarLancamentos(br.net.walltec.api.vo.LancamentoVO, java.util.Date)
	 */
	@Override
	public List<Lancamento> montarListaLancamentos(GeracaoParcelasDto dto) throws NegocioException {
		Date dataInicialAux = UtilData.getData(dto.getDataVencimentoStr(), "/"); 
		int numParcela = 1;
		List<Lancamento> lancamentos = new ArrayList<>();

		for(int i = 0; i < dto.getQuantidade(); i++) {
			Lancamento lancamento = new Lancamento();
			lancamento.setConta(new Conta());
			lancamento.getConta().setId(dto.getIdConta());
			lancamento.getConta().setDespesa(dto.isDespesa());
			
			lancamento.setNumero(Integer.valueOf( ++numParcela).shortValue() );
			lancamento.setDataVencimento(dataInicialAux);
			lancamento.setDescricao(dto.getDescricaoParcela());
			lancamento.setFormaPagamento(new FormaPagamento());
			lancamento.getFormaPagamento().setId(dto.getIdFormaPagamento());
			lancamento.setBolPaga(false);
			lancamento.setBolConciliado(false);
			
			if (dto.getIdParcelaOrigem() != null) {
				lancamento.setLancamentoOrigem(new Lancamento());
				lancamento.getLancamentoOrigem().setId(dto.getIdParcelaOrigem());
			}
			lancamento.setValor(dto.getValorVencimento());
			lancamentos.add(lancamento);

			dataInicialAux = UtilData.somarData(dataInicialAux, 1, ChronoUnit.MONTHS);
		}
		return lancamentos;
	}
	
	private void mapearLancamento(Map<String, List<Lancamento>> mapaCache, Lancamento lancamento) {
		String dataFormatada = lancamento.getDataVencimento().getMonth()+""; //, "yyyy-mm-dd");
		mapaCache.putIfAbsent(dataFormatada, new ArrayList<>()).add(lancamento);
		//mapaCache.computeIfAbsent(key, mappingFunction)get(dataFormatada).add(lancamento);
	}

	/* (non-Javadoc)
	 * @see br.net.walltec.api.negocio.servicos.LancamentoServico#montarDashboards(java.lang.Integer, java.lang.Integer)
	 */
	@Override
	public MapaDashboardDTO montarDashboards(Integer mes, Integer ano) throws NegocioException {
		try {
			Date dataBase = UtilData.asDate(LocalDate.of(ano, mes, 1));
			Date ultimaDataMes = UtilData.getUltimaDataMes(dataBase);
			List<Lancamento> listaMesAtual = lancamentoDao.listarParcelas(UtilData.createDataSemHoras(1, mes, ano), 
					ultimaDataMes, null, null);
			
			if (listaMesAtual == null || listaMesAtual.isEmpty()) {
				throw new NegocioException("Nenhum lançamento para esse mês");
			}
			
//			Map<String, List<Lancamento>> mapaMensal = 
//					listaMesAtual
//						.stream()
//						.collect(Collectors.groupingBy(Lancamento::getMesAno));
			
			//0=receita; 1=despesa; 2=saldo
			ResumoMesAnoDTO calculoTotais = calcularTotais(listaMesAtual);
			
			MapaDashboardDTO mapaDashboard = new MapaDashboardDTO();
			mapaDashboard.setRubricaMesAnoDTO(getResumoPorRubricasMesPesquisa(listaMesAtual));
			mapaDashboard.setSaldoEmConta( getTotalConciliado(listaMesAtual) );
			mapaDashboard.setTotalEntradas(calculoTotais.getTotalReceitas());
			mapaDashboard.setTotalSaidas(calculoTotais.getTotalDespesas());
			mapaDashboard.setTotalPagar( getTotalPagar(listaMesAtual) );
			mapaDashboard.setTotalPago( mapaDashboard.getTotalSaidas().subtract(mapaDashboard.getTotalPagar()) );
			
			return mapaDashboard;
		} catch (PersistenciaException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return null;
	}
	
	

	/**
	 * @param listaMesAtual
	 * @return
	 */
	private BigDecimal getTotalConciliado(List<Lancamento> listaMesAtual) {
		Double totalConciliado =
				listaMesAtual
					.stream()
					.filter(lancamento -> lancamento.isDespesa() && lancamento.getBolConciliado())
					.mapToDouble(lanc -> lanc.getValorEmDouble())
					.sum();
		return new BigDecimal(totalConciliado);
	}

	/**
	 * @param listaMesAtual
	 * @return
	 */
	private BigDecimal getTotalPagar(List<Lancamento> listaMesAtual) {
		Double valorAPagar =
				listaMesAtual.stream()
				.filter(lancamento -> lancamento.isDespesa() && !lancamento.getBolPaga())
				.mapToDouble(lanc -> lanc.getValorEmDouble())
				.sum();
				
		return new BigDecimal(valorAPagar);
	}
	
	private BigDecimal getTotalReceber(List<Lancamento> listaMesAtual) {
		Double valorAPagar =
				listaMesAtual.stream()
				.filter(lancamento -> lancamento.isReceita() && !lancamento.getBolPaga())
				.mapToDouble(lanc -> lanc.getValorEmDouble())
				.sum();
				
		return new BigDecimal(valorAPagar);
	}	

	/**
	 * @param mapaMensal
	 * @param mesAnoAtual
	 * @return
	 */
	private Set<RubricaMesAnoDTO> getResumoPorRubricasMesPesquisa(List<Lancamento> lancamentos) {
		Set<RubricaMesAnoDTO> rubricas = new HashSet<>(); 
		lancamentos
				.stream()
				.collect(Collectors.groupingBy(Lancamento::getDescConta, Collectors.summingDouble(Lancamento::getValorEmDouble)))
				.forEach((rubrica, total) -> {
					RubricaMesAnoDTO dto = new RubricaMesAnoDTO();
					dto.setNomeRubrica(rubrica);
					dto.setValorRubrica(new BigDecimal(total));
					rubricas.add(dto);
				});

		System.out.println(rubricas);
				
		
		return rubricas;
	}

	/**
	 * @param mapaMensal
	 * @return
	 */
	private Set<ResumoMesAnoDTO> getResumoPorMesAno(Map<String, List<Lancamento>> mapaMensal) {
		
		return 
				mapaMensal
				.entrySet()
				.stream()
				.map(itemMap -> {
					ResumoMesAnoDTO dto = this.calcularTotais(itemMap.getValue());
					String[] chaveQuebrada = itemMap.getKey().split("/");
					
					dto.setMes(Integer.valueOf(chaveQuebrada[0]));
					dto.setAno(Integer.valueOf(chaveQuebrada[1]));
					return dto;
				})
				.collect(Collectors.toSet());
	}

	/**
	 * @param list
	 * @return
	 */
	private ResumoMesAnoDTO calcularTotais(List<Lancamento> lista) {
		Map<Boolean, Double> mapTotais = lista.stream()
			.collect(Collectors.groupingBy(Lancamento::isReceita, Collectors.summingDouble(Lancamento::getValorEmDouble)));
		BigDecimal saldo = new BigDecimal(mapTotais.get(true)).subtract(new BigDecimal(mapTotais.get(false)));
		
		ResumoMesAnoDTO dto = new ResumoMesAnoDTO();
		dto.setTotalDespesas(new BigDecimal(mapTotais.get(false)).setScale(2, RoundingMode.CEILING));
		dto.setTotalReceitas(new BigDecimal(mapTotais.get(true)).setScale(2,RoundingMode.CEILING));
		dto.setSaldoFinal(saldo);
		
		return dto;
	}

	/* (non-Javadoc)
	 * @see br.net.walltec.api.negocio.servicos.LancamentoServico#obterResumoMesAno(br.net.walltec.api.dto.FiltraParcelasDto)
	 */
	@Override
	public ResumoMesAnoDTO obterResumoMesAno(FiltraParcelasDto dtoFiltro) throws NegocioException {
		log.info("Parametros:" + dtoFiltro);
    	try {
			List<Lancamento> listaParcelas = filtrarParcelas(dtoFiltro);
			if (listaParcelas == null || listaParcelas.isEmpty()) {
				throw new NegocioException("Lançamentos não encontrados!");
			}
			
			ResumoMesAnoDTO resumo = this.calcularTotais(listaParcelas);
			return resumo;
		} catch (PersistenciaException e) {
			throw new NegocioException(e);
		}		

	}

	/* (non-Javadoc)
	 * @see br.net.walltec.api.negocio.servicos.LancamentoServico#obterResumoDetalhadoMesAno(br.net.walltec.api.dto.FiltraParcelasDto)
	 */
	@Override
	public ResumoDetalhadoMesAnoDTO obterResumoDetalhadoMesAno(FiltraParcelasDto dtoFiltro) throws NegocioException {
		log.info("Parametros:" + dtoFiltro);
		log.info("Parametros:" + dtoFiltro);
    	try {
			List<Lancamento> listaParcelas = filtrarParcelas(dtoFiltro);
			
			if (listaParcelas == null || listaParcelas.isEmpty()) {
				throw new NegocioException("Lançamentos não encontrados!");
			}
			
			ResumoMesAnoDTO resumo = this.calcularTotais(listaParcelas);
			
			ResumoDetalhadoMesAnoDTO dto = new ResumoDetalhadoMesAnoDTO(resumo);
			dto.setTotalPagar(getTotalPagar(listaParcelas));
			dto.setTotalReceber(getTotalReceber(listaParcelas));
			
			dto.setTotalRecebido(dto.getTotalReceitas().subtract(dto.getTotalReceber()));
			dto.setTotalPago(dto.getTotalDespesas().subtract(dto.getTotalPagar()));
			return dto;
		} catch (PersistenciaException e) {
			throw new NegocioException(e);
		}		

	}

	/* (non-Javadoc)
	 * @see br.net.walltec.api.negocio.servicos.LancamentoServico#gerarLancamentos(br.net.walltec.api.dto.GeracaoParcelasDto)
	 */
	@Override
	@Transactional(value=TxType.REQUIRES_NEW)
	public List<LancamentoVO> gerarLancamentos(GeracaoParcelasDto dto) throws NegocioException {
		
		if (dto == null) {
			throw new NegocioException("Informações para geração não informadas!");			
		}
		
		List<Lancamento> lista = new ArrayList<>();
		for(Lancamento l : this.montarListaLancamentos(dto)) {
			this.incluir(l);
			lista.add(l);
		}
		return getConversor().converterEntidadeParaPojo(lista);
	}

	/* (non-Javadoc)
	 * @see br.net.walltec.api.negocio.servicos.LancamentoServico#montarListaLancamentosVO(br.net.walltec.api.dto.GeracaoParcelasDto)
	 */
	@Override
	public List<LancamentoVO> montarListaLancamentosVO(GeracaoParcelasDto dto) throws NegocioException {
		List<Lancamento> lista = this.montarListaLancamentos(dto);
		return getConversor().converterEntidadeParaPojo(lista);
	}
	
	/* (non-Javadoc)
	 * @see br.net.walltec.api.negocio.servicos.AbstractCrudServicoPadrao#incluirVO(br.net.walltec.api.vo.GerenciadorPadraoVO)
	 */
	@Override
	public LancamentoVO incluirVO(LancamentoVO objeto) throws NegocioException {
    	Date dataFim = objeto.getDataFimStr() != null && !objeto.getDataFimStr().isEmpty() ? UtilData.getData(objeto.getDataFimStr(), UtilData.SEPARADOR_PADRAO) : null;
    	Date dataVencimento = UtilData.getData(objeto.getDataVencimentoStr(), UtilData.SEPARADOR_PADRAO);
    	
    	if (dataFim != null && dataFim.before(dataVencimento)) {
    		throw new WebServiceException("Data Fim não deve ser menor do que a data de Vencimento!");
    	}	
    	
        if (dataFim != null) {
        	this.gerarLancamentos(objeto, dataVencimento, dataFim);
        	return objeto;
        } else {		
        	return super.incluirVO(objeto);
        }
	}
	

	/**
	 * @param objeto
	 */
	private void gerarLancamentos(LancamentoVO objeto, Date dataVencimento, Date dataFim) throws NegocioException {
		int qtd = (UtilData.getDiasDiferenca(dataVencimento, dataFim) / 30)+1;
		
    	GeracaoParcelasDto dto = new GeracaoParcelasDto();
    	dto.setDataVencimentoStr(objeto.getDataVencimentoStr());
    	dto.setIdConta(objeto.getIdConta());
    	dto.setQuantidade(qtd);
    	dto.setValorVencimento(objeto.isDespesa() ? UtilFormatador.formatarStringComoValor(objeto.getValorDebitoStr()) :
    												UtilFormatador.formatarStringComoValor(objeto.getValorCreditoStr()));
    	dto.setIdParcelaOrigem(objeto.getIdParcelaOrigem());
    	dto.setParcial(false);
    	dto.setIdUsuario(1);
    	dto.setDescricaoParcela(objeto.getDescricao());
    	dto.setDespesa(objeto.isDespesa());
		this.gerarLancamentos(dto);
	}

	/* (non-Javadoc)
	 * @see br.net.walltec.api.negocio.servicos.LancamentoServico#associarLancamentos(java.util.List)
	 */
	
	@Transactional(value=TxType.REQUIRES_NEW)
	@Override
	public void associarLancamentos(List<RegistroExtratoDto> lancamentos) throws NegocioException {
		
		Optional<RegistroExtratoDto> optTemDtoComValorDiferente = 
				lancamentos
				.stream()
				.filter(dto -> hasValorDiferente(dto))
				.findFirst();
		if (optTemDtoComValorDiferente.isPresent()) {
			throw new NegocioException("Existem extratos com valores associados diferentes!");
		}

		List<LancamentoVO> lancamentosAAtualizar = new ArrayList<>();
		
		lancamentos
			.stream()
			.forEach(dto -> {
				dto.getLancamentos()
					.forEach(vo -> {
						vo.setBolConciliado(true);
						vo.setDataVencimentoStr(dto.getDataLancamento());
						vo.setNumDocumento(dto.getDocumento());
						lancamentosAAtualizar.add(vo);
					});
			});

		for(LancamentoVO vo : lancamentosAAtualizar) {
			try {
				lancamentoDao.associarLancamentoComExtrato(vo.getId(), vo.getNumDocumento(), UtilData.getData(vo.getDataVencimentoStr(), "/"));
			} catch (PersistenciaException e) {
				e.printStackTrace();
			}
		}
	}

	/**
	 * @param dto
	 * @return
	 */
	private boolean hasValorDiferente(RegistroExtratoDto dto) {
		BigDecimal valorExtrato = UtilFormatador.formatarStringComoValor(dto.getValor());
		return valorExtrato.doubleValue() != dto.calcularTotalLancamentos();
	}

	/* (non-Javadoc)
	 * @see br.net.walltec.api.negocio.servicos.LancamentoServico#desfazerConciliacoes(br.net.walltec.api.rest.dto.filtro.DesfazimentoConciliacaoDTO)
	 */
	@Transactional(value=TxType.REQUIRES_NEW)
	@Override
	public void desfazerConciliacoes(DesfazimentoConciliacaoDTO desfazimentoDTO) throws NegocioException {

		//if estiver fechado, informar que já foi fechado o mês...
		
		if (LocalDate.now().getMonth().getValue() != desfazimentoDTO.getMes().intValue() &&  
				LocalDate.now().getDayOfMonth() > 2) {
			throw new NegocioException("Não é possível desfazer as conciliações deste mês!");
		}
		
		try {
			List<Lancamento> lancamentos = this.filtrarParcelas(new FiltraParcelasDto(desfazimentoDTO.getMes(), desfazimentoDTO.getAno()));
			
			lancamentos
				.stream()
				.forEach(entidade -> {
					entidade.setBolConciliado(false);
					entidade.setNumDocumento(null);
				});
			this.alterar(lancamentos);
		} catch (PersistenciaException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
	}

	/* (non-Javadoc)
	 * @see br.net.walltec.api.negocio.servicos.LancamentoServico#fecharMes(br.net.walltec.api.rest.dto.filtro.RegistroFechamentoMesDTO)
	 */
	@Transactional(value=TxType.REQUIRES_NEW)	
	@Override
	public void fecharMes(RegistroFechamentoMesDTO fechamentoDTO) throws NegocioException {

		if ( this.isMesFechado(fechamentoDTO.getMes(), fechamentoDTO.getAno()) ) {
			throw new NegocioException("Este mês já foi fechado!");
		}
		FechamentoContabil fechamento = new FechamentoContabil();
		fechamento.setNumAno(fechamentoDTO.getAno());
		fechamento.setNumMes(fechamentoDTO.getMes());
		fechamento.setDataFechamento(new Date());
		try {
			fechamentoContabilDao.incluir(fechamento);
		} catch (PersistenciaException e) {
			throw new NegocioException(e);
		}
		
	}

	/* (non-Javadoc)
	 * @see br.net.walltec.api.negocio.servicos.LancamentoServico#isMesFechado(int, int)
	 */
	@Override
	public boolean isMesFechado(int mes, int ano) throws NegocioException {
		FechamentoContabil fechamento = new FechamentoContabil();
		fechamento.setNumAno(ano);
		fechamento.setNumMes(mes);

		try {
			FechamentoContabil fc =  fechamentoContabilDao.pesquisar(fechamento);
			return fc != null;
		} catch (NoResultException e) {
			return false;
		} catch (Exception e) {
			throw new NegocioException(e);
		}
	}	
	
}