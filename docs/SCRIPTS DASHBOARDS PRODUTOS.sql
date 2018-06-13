--total por tipo de lista
select tl.no_tipolista, lc.co_mesref as mes, count(*) as qtd, sum( pc.qt_unidade * pc.va_unitario ) as total 
from produtocompras pc
join listacompras lc on (lc.co_lista = pc.co_lista)
join tipolista tl on (tl.co_tipolista = lc.co_tipolista)
where concat(substring(lc.co_mesref, 3,4), substring(lc.co_mesref,1,2)) between '201401' and '201409'
group by tl.no_tipolista, lc.co_mesref
order by 1
limit 99999


--total economizado por mês
select lc.co_mesref, lc.va_disponivel, sum( pc.qt_unidade * pc.va_unitario ) as total_comprado, lc.va_disponivel - sum( pc.qt_unidade * pc.va_unitario ) as dif
from db_personalcontrol.listacompras lc
join produtocompras pc on (lc.co_lista = pc.co_lista)
where ln_comprado = 1
and lc.co_mesref like '%2014'
group by lc.co_mesref, lc.va_disponivel
order by 1
limit 99999


--top 10 produtos que tiveram algum aumento nos últimos 3 meses;
create temporary table tmpMesInicial(co_produto int, valor numeric(10,2) )

insert into tmpMesInicial
select p.co_produto, pc.va_unitario
from produtocompras pc 
join listacompras lc on (lc.co_lista = pc.co_lista)
join produto p on (p.co_produto = pc.co_produto)
where ln_comprado = 1
and lc.co_mesref = '062014'
order by p.no_produto
limit 99999

--variação por natureza nos últimos 12 meses.

