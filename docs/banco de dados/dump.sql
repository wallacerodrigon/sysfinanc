--
-- PostgreSQL database dump
--

SET statement_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = off;
SET check_function_bodies = false;
SET client_min_messages = warning;
SET escape_string_warning = off;

SET search_path = sysfinanc, pg_catalog;

ALTER TABLE ONLY sysfinanc.lancamento DROP CONSTRAINT fk_lancamento_formapagamento;
ALTER TABLE ONLY sysfinanc.lancamento DROP CONSTRAINT fk_lancamento_conta;
ALTER TABLE ONLY sysfinanc.conta DROP CONSTRAINT fk_conta_usuario;
DROP INDEX sysfinanc.idx_conta_idusuario;
DROP INDEX sysfinanc.idx_conta_fixo;
DROP INDEX sysfinanc.idx_conta;
ALTER TABLE ONLY sysfinanc.usuario DROP CONSTRAINT usuario_pkey;
ALTER TABLE ONLY sysfinanc.lancamento DROP CONSTRAINT lancamento_pkey;
ALTER TABLE ONLY sysfinanc.formapagamento DROP CONSTRAINT formapagamento_pkey;
ALTER TABLE ONLY sysfinanc.conta DROP CONSTRAINT conta_pkey;
ALTER TABLE sysfinanc.usuario ALTER COLUMN IDUSUARIO DROP DEFAULT;
ALTER TABLE sysfinanc.lancamento ALTER COLUMN IDLANCAMENTO DROP DEFAULT;
ALTER TABLE sysfinanc.formapagamento ALTER COLUMN IDFORMAPAGAMENTO DROP DEFAULT;
ALTER TABLE sysfinanc.conta ALTER COLUMN IDCONTA DROP DEFAULT;
DROP SEQUENCE sysfinanc.usuario_IDUSUARIO_seq;
DROP TABLE sysfinanc.usuario;
DROP SEQUENCE sysfinanc.lancamento_IDLANCAMENTO_seq;
DROP TABLE sysfinanc.lancamento;
DROP SEQUENCE sysfinanc.formapagamento_IDFORMAPAGAMENTO_seq;
DROP TABLE sysfinanc.formapagamento;
DROP SEQUENCE sysfinanc.conta_IDCONTA_seq;
DROP TABLE sysfinanc.conta;
DROP SCHEMA sysfinanc;
DROP SCHEMA public;
--
-- Name: public; Type: SCHEMA; Schema: -; Owner: postgres
--

CREATE SCHEMA public;


ALTER SCHEMA public OWNER TO postgres;

--
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: postgres
--

COMMENT ON SCHEMA public IS 'standard public schema';


--
-- Name: sysfinanc; Type: SCHEMA; Schema: -; Owner: wallace
--

CREATE SCHEMA sysfinanc;


ALTER SCHEMA sysfinanc OWNER TO wallace;

--
-- Name: SCHEMA sysfinanc; Type: COMMENT; Schema: -; Owner: wallace
--

COMMENT ON SCHEMA sysfinanc IS 'esquema padrão';


--
-- Name: plpgsql; Type: PROCEDURAL LANGUAGE; Schema: -; Owner: postgres
--


ALTER PROCEDURAL LANGUAGE plpgsql OWNER TO postgres;

SET search_path = sysfinanc, pg_catalog;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: conta; Type: TABLE; Schema: sysfinanc; Owner: wallace; Tablespace: 
--

CREATE TABLE conta (
    IDCONTA integer NOT NULL,
    DATACADASTRO timestamp without time zone NOT NULL,
    DESCCONTA character varying(100) NOT NULL,
    IDUSUARIO integer NOT NULL,
    BOLATIVO boolean DEFAULT true NOT NULL,
    BOLFIXO boolean DEFAULT false NOT NULL,
    CODTIPO character(1) DEFAULT 'D'::bpchar NOT NULL
);


ALTER TABLE sysfinanc.conta OWNER TO wallace;

--
-- Name: conta_IDCONTA_seq; Type: SEQUENCE; Schema: sysfinanc; Owner: wallace
--

CREATE SEQUENCE conta_IDCONTA_seq
    START WITH 1
    INCREMENT BY 1
    NO MAXVALUE
    NO MINVALUE
    CACHE 1;


ALTER TABLE sysfinanc.conta_IDCONTA_seq OWNER TO wallace;

--
-- Name: conta_IDCONTA_seq; Type: SEQUENCE OWNED BY; Schema: sysfinanc; Owner: wallace
--

ALTER SEQUENCE conta_IDCONTA_seq OWNED BY conta.IDCONTA;


--
-- Name: conta_IDCONTA_seq; Type: SEQUENCE SET; Schema: sysfinanc; Owner: wallace
--

SELECT pg_catalog.setval('conta_IDCONTA_seq', 1, true);


--
-- Name: formapagamento; Type: TABLE; Schema: sysfinanc; Owner: wallace; Tablespace: 
--

CREATE TABLE formapagamento (
    IDFORMAPAGAMENTO integer NOT NULL,
    DESCFORMAPAGAMENTO character varying(50) NOT NULL,
    BOLATIVO boolean DEFAULT true NOT NULL
);


ALTER TABLE sysfinanc.formapagamento OWNER TO wallace;

--
-- Name: formapagamento_IDFORMAPAGAMENTO_seq; Type: SEQUENCE; Schema: sysfinanc; Owner: wallace
--

CREATE SEQUENCE formapagamento_IDFORMAPAGAMENTO_seq
    START WITH 1
    INCREMENT BY 1
    NO MAXVALUE
    NO MINVALUE
    CACHE 1;


ALTER TABLE sysfinanc.formapagamento_IDFORMAPAGAMENTO_seq OWNER TO wallace;

--
-- Name: formapagamento_IDFORMAPAGAMENTO_seq; Type: SEQUENCE OWNED BY; Schema: sysfinanc; Owner: wallace
--

ALTER SEQUENCE formapagamento_IDFORMAPAGAMENTO_seq OWNED BY formapagamento.IDFORMAPAGAMENTO;


--
-- Name: formapagamento_IDFORMAPAGAMENTO_seq; Type: SEQUENCE SET; Schema: sysfinanc; Owner: wallace
--

SELECT pg_catalog.setval('formapagamento_IDFORMAPAGAMENTO_seq', 1, false);


--
-- Name: lancamento; Type: TABLE; Schema: sysfinanc; Owner: wallace; Tablespace: 
--

CREATE TABLE lancamento (
    IDLANCAMENTO integer NOT NULL,
    IDCONTA integer NOT NULL,
    NUMLANCAMENTO smallint NOT NULL,
    DATAVENCIMENTO date NOT NULL,
    VALORLANCAMENTO numeric(10,2) NOT NULL,
    IDFORMAPAGAMENTO integer NOT NULL,
    DATAPAGAMENTO date,
    BOLPAGA boolean DEFAULT false NOT NULL,
    VALORPAGAMENTO numeric(10,2),
    VALORUTILIZADO numeric(10,2)
);


ALTER TABLE sysfinanc.lancamento OWNER TO wallace;

--
-- Name: lancamento_IDLANCAMENTO_seq; Type: SEQUENCE; Schema: sysfinanc; Owner: wallace
--

CREATE SEQUENCE lancamento_IDLANCAMENTO_seq
    START WITH 1
    INCREMENT BY 1
    NO MAXVALUE
    NO MINVALUE
    CACHE 1;


ALTER TABLE sysfinanc.lancamento_IDLANCAMENTO_seq OWNER TO wallace;

--
-- Name: lancamento_IDLANCAMENTO_seq; Type: SEQUENCE OWNED BY; Schema: sysfinanc; Owner: wallace
--

ALTER SEQUENCE lancamento_IDLANCAMENTO_seq OWNED BY lancamento.IDLANCAMENTO;


--
-- Name: lancamento_IDLANCAMENTO_seq; Type: SEQUENCE SET; Schema: sysfinanc; Owner: wallace
--

SELECT pg_catalog.setval('lancamento_IDLANCAMENTO_seq', 1, false);


--
-- Name: usuario; Type: TABLE; Schema: sysfinanc; Owner: wallace; Tablespace: 
--

CREATE TABLE usuario (
    IDUSUARIO integer NOT NULL,
    NOMEUSUARIO character varying(50) NOT NULL,
    DATACADASTRO timestamp with time zone NOT NULL,
    NOMELOGIN character varying(10) NOT NULL,
    SENHA character varying(10) NOT NULL,
    DATAULTIMOLOGIN timestamp without time zone,
    BOLATIVO boolean DEFAULT true NOT NULL
);


ALTER TABLE sysfinanc.usuario OWNER TO wallace;

--
-- Name: usuario_IDUSUARIO_seq; Type: SEQUENCE; Schema: sysfinanc; Owner: wallace
--

CREATE SEQUENCE usuario_IDUSUARIO_seq
    START WITH 1
    INCREMENT BY 1
    NO MAXVALUE
    NO MINVALUE
    CACHE 1;


ALTER TABLE sysfinanc.usuario_IDUSUARIO_seq OWNER TO wallace;

--
-- Name: usuario_IDUSUARIO_seq; Type: SEQUENCE OWNED BY; Schema: sysfinanc; Owner: wallace
--

ALTER SEQUENCE usuario_IDUSUARIO_seq OWNED BY usuario.IDUSUARIO;


--
-- Name: usuario_IDUSUARIO_seq; Type: SEQUENCE SET; Schema: sysfinanc; Owner: wallace
--

SELECT pg_catalog.setval('usuario_IDUSUARIO_seq', 1, false);


--
-- Name: IDCONTA; Type: DEFAULT; Schema: sysfinanc; Owner: wallace
--

ALTER TABLE ONLY conta ALTER COLUMN IDCONTA SET DEFAULT nextval('conta_IDCONTA_seq'::regclass);


--
-- Name: IDFORMAPAGAMENTO; Type: DEFAULT; Schema: sysfinanc; Owner: wallace
--

ALTER TABLE ONLY formapagamento ALTER COLUMN IDFORMAPAGAMENTO SET DEFAULT nextval('formapagamento_IDFORMAPAGAMENTO_seq'::regclass);


--
-- Name: IDLANCAMENTO; Type: DEFAULT; Schema: sysfinanc; Owner: wallace
--

ALTER TABLE ONLY lancamento ALTER COLUMN IDLANCAMENTO SET DEFAULT nextval('lancamento_IDLANCAMENTO_seq'::regclass);


--
-- Name: IDUSUARIO; Type: DEFAULT; Schema: sysfinanc; Owner: wallace
--

ALTER TABLE ONLY usuario ALTER COLUMN IDUSUARIO SET DEFAULT nextval('usuario_IDUSUARIO_seq'::regclass);


--
-- Data for Name: conta; Type: TABLE DATA; Schema: sysfinanc; Owner: wallace
--



--
-- Data for Name: formapagamento; Type: TABLE DATA; Schema: sysfinanc; Owner: wallace
--



--
-- Data for Name: lancamento; Type: TABLE DATA; Schema: sysfinanc; Owner: wallace
--



--
-- Data for Name: usuario; Type: TABLE DATA; Schema: sysfinanc; Owner: wallace
--



--
-- Name: conta_pkey; Type: CONSTRAINT; Schema: sysfinanc; Owner: wallace; Tablespace: 
--

ALTER TABLE ONLY conta
    ADD CONSTRAINT conta_pkey PRIMARY KEY (IDCONTA);


--
-- Name: formapagamento_pkey; Type: CONSTRAINT; Schema: sysfinanc; Owner: wallace; Tablespace: 
--

ALTER TABLE ONLY formapagamento
    ADD CONSTRAINT formapagamento_pkey PRIMARY KEY (IDFORMAPAGAMENTO);


--
-- Name: lancamento_pkey; Type: CONSTRAINT; Schema: sysfinanc; Owner: wallace; Tablespace: 
--

ALTER TABLE ONLY lancamento
    ADD CONSTRAINT lancamento_pkey PRIMARY KEY (IDLANCAMENTO);


--
-- Name: usuario_pkey; Type: CONSTRAINT; Schema: sysfinanc; Owner: wallace; Tablespace: 
--

ALTER TABLE ONLY usuario
    ADD CONSTRAINT usuario_pkey PRIMARY KEY (IDUSUARIO);


--
-- Name: idx_conta; Type: INDEX; Schema: sysfinanc; Owner: wallace; Tablespace: 
--

CREATE INDEX idx_conta ON lancamento USING btree (DATAVENCIMENTO, IDCONTA, BOLPAGA);


--
-- Name: idx_conta_fixo; Type: INDEX; Schema: sysfinanc; Owner: wallace; Tablespace: 
--

CREATE INDEX idx_conta_fixo ON conta USING btree (BOLFIXO, DATACADASTRO);


--
-- Name: idx_conta_idusuario; Type: INDEX; Schema: sysfinanc; Owner: wallace; Tablespace: 
--

CREATE INDEX idx_conta_idusuario ON conta USING btree (IDUSUARIO, BOLATIVO, CODTIPO);

ALTER TABLE conta CLUSTER ON idx_conta_idusuario;


--
-- Name: fk_conta_usuario; Type: FK CONSTRAINT; Schema: sysfinanc; Owner: wallace
--

ALTER TABLE ONLY conta
    ADD CONSTRAINT fk_conta_usuario FOREIGN KEY (IDUSUARIO) REFERENCES usuario(IDUSUARIO);


--
-- Name: fk_lancamento_conta; Type: FK CONSTRAINT; Schema: sysfinanc; Owner: wallace
--

ALTER TABLE ONLY lancamento
    ADD CONSTRAINT fk_lancamento_conta FOREIGN KEY (IDCONTA) REFERENCES conta(IDCONTA);


--
-- Name: fk_lancamento_formapagamento; Type: FK CONSTRAINT; Schema: sysfinanc; Owner: wallace
--

ALTER TABLE ONLY lancamento
    ADD CONSTRAINT fk_lancamento_formapagamento FOREIGN KEY (IDFORMAPAGAMENTO) REFERENCES formapagamento(IDFORMAPAGAMENTO);


--
-- Name: public; Type: ACL; Schema: -; Owner: postgres
--

REVOKE ALL ON SCHEMA public FROM PUBLIC;
REVOKE ALL ON SCHEMA public FROM postgres;
GRANT ALL ON SCHEMA public TO postgres;
GRANT ALL ON SCHEMA public TO PUBLIC;


--
-- Name: sysfinanc; Type: ACL; Schema: -; Owner: wallace
--

REVOKE ALL ON SCHEMA sysfinanc FROM PUBLIC;
GRANT ALL ON SCHEMA sysfinanc TO wallace_sysfinanc_producao WITH GRANT OPTION;


--
-- Name: conta; Type: ACL; Schema: sysfinanc; Owner: wallace
--

REVOKE ALL ON TABLE conta FROM PUBLIC;
REVOKE ALL ON TABLE conta FROM wallace;
GRANT ALL ON TABLE conta TO wallace;
GRANT ALL ON TABLE conta TO wallace_sysfinanc_producao;


--
-- PostgreSQL database dump complete
--

