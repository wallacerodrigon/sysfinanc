SELECT MONTH(l.dt_vencimento) AS mes, CASE WHEN ln_despesa = b'1' THEN 'SAÍDAS' ELSE 'ENTRADAS' END AS TipoCredito, l.bolconciliado, SUM(va_parcela) AS valor 
FROM lancamento l
JOIN conta c ON c.co_conta = l.co_conta
JOIN tipoconta tc ON tc.co_tipoconta = c.co_tipoconta
WHERE dt_vencimento BETWEEN '2017-01-01' AND '2017-12-31'
GROUP by MONTH(l.dt_vencimento), CASE WHEN ln_despesa = b'1' THEN 'S' ELSE 'N' END, l.bolconciliado
ORDER BY mes


