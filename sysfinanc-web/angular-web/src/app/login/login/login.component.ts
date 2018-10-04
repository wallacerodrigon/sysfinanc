import { Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {UsuarioVO} from '../../dominio/vo/usuario-vo';
import {LoginService} from '../login.service';
import {AlertaComponent} from '../../componentes/mensagens/alert.component';
import { DialogComponent, DialogService } from "ng2-bootstrap-modal";
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { RecuperaUsuarioLoginSenhaDto } from 'app/dominio/dto/recupera-usuario-login-senha-dto';
import { RubricaService } from '../../rubricas/rubrica.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  rForm: FormGroup;
  public usuario: UsuarioVO = new UsuarioVO();
  private alerta: AlertaComponent = new AlertaComponent(this._dialogService);

  private senha: string;

  @BlockUI() blockUI: NgBlockUI;
  @ViewChild("loginForm") loginForm: FormGroup;

  constructor(private router: Router, private _dialogService: DialogService,
              private fb: FormBuilder, 
              private loginService: LoginService,
              private rubricaService: RubricaService ) { 
  }

  ngOnInit() {
    this.loginForm = new FormGroup({
        'login': new FormControl(this.usuario.login, [
          Validators.required,
          Validators.maxLength(8)
        ]),
        'senha': new FormControl(this.senha, [
            Validators.required,
            Validators.maxLength(8)
        ]),
      });      
  }

  efetuarLogin(){
    
    if (!this.usuario.login || !this.senha){
        this.alerta.exibirMensagem("Login e senha devem ser informados");
        return;         
    }

    let dto: RecuperaUsuarioLoginSenhaDto = 
            new RecuperaUsuarioLoginSenhaDto(this.usuario.login, this.senha);

     this.blockUI.start('Autenticando...');
     this.loginService
        .efetuarLogin(dto)
        .subscribe(usuario => {
            if (! this.rubricaService.temCache()){
                this.rubricaService.listarParaCache();
            }
            this.blockUI.stop(); // Stop blocking
            this.router.navigate(['/dashboard']);
        },
        erro => {
            this.blockUI.stop(); // Stop blocking
            if (erro.status === 403){
                this.alerta.exibirMensagem("Usuário ou senha inválidos");
            } 
        });
  }

}
