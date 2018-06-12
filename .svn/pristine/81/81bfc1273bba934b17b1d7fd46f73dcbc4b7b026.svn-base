SELECT l.dt_vencimento, va_parcela, l.no_descricao, l.bolpaga, l.bolconciliado, tc.no_descricao AS tipoConta,
	   ln_despesa, c.no_descricao AS rubrica, c.co_conta

FROM lancamento l
JOIN conta c ON c.co_conta = l.co_conta
JOIN tipoconta tc ON tc.co_tipoconta = c.co_tipoconta
WHERE dt_vencimento BETWEEN '2018-01-01' AND '2018-01-31'
ORDER BY dt_vencimento
