package br.net.walltec.api.entidades;

import java.util.Date;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OrderBy;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import br.net.walltec.api.entidades.comum.EntidadeBasica;

@Entity
@Table(name = "conta")
@Cache(usage=CacheConcurrencyStrategy.TRANSACTIONAL)
public class Conta extends EntidadeBasica<Conta> {

    /**
     *
     */
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "co_conta")
    private Integer id;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "dt_cadastro")
    private Date dataCadastro;

    @Column(name = "no_descricao")
    private String descricao;

    //@Autowired
    @ManyToOne
    @JoinColumn(name = "co_tipoconta")
    private TipoConta tipoConta;

    @OneToMany(mappedBy = "conta", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<Lancamento> listaLancamentos;

    @OrderBy(value="despesa")
    @Column(name = "ln_despesa")
    private Boolean despesa;

    @ManyToOne
    @JoinColumn(name = "co_usuario")
    private Usuario usuario;



    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + ((getId() == null) ? 0 : getId().hashCode());
        return result;
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj) {
            return true;
        }
        if (obj == null) {
            return false;
        }
        if (!(obj instanceof Conta)) {
            return false;
        }
        Conta other = (Conta) obj;
        if (getId() == null) {
            if (other.getId() != null) {
                return false;
            }
        } else if (!getId().equals(other.getId())) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return String
                .format("Conta [id=%s, descricao=%s, tipoConta=%s, despesa=%s]",
                        getId(), getDescricao(), getTipoConta(), getDespesa());
    }

    public Usuario getUsuario() {
        return usuario;
    }

    public void setUsuario(Usuario usuario) {
        this.usuario = usuario;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Date getDataCadastro() {
        return dataCadastro;
    }

    public void setDataCadastro(Date dataCadastro) {
        this.dataCadastro = dataCadastro;
    }

    public String getDescricao() {
        return descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public TipoConta getTipoConta() {
        return tipoConta;
    }

    public void setTipoConta(TipoConta tipoConta) {
        this.tipoConta = tipoConta;
    }

    public List<Lancamento> getListaLancamentos() {
        return listaLancamentos;
    }

    public void setListaLancamentos(List<Lancamento> listaLancamentos) {
        this.listaLancamentos = listaLancamentos;
    }

    public Boolean getDespesa() {
        return despesa;
    }

    public void setDespesa(Boolean despesa) {
        this.despesa = despesa;
    }
}
 
