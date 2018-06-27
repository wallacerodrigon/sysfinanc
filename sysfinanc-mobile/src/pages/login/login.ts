import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {HomePage} from '../home/home';
import { UsuarioService } from '../../providers/usuario-service';


/**
 * Generated class for the Login page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  public usuario: string;
  public senha: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public usuarioService: UsuarioService) {
  }

  efetuaLogin(){
    this.usuarioService
        .efetuarLogin(this.usuario, this.senha)
        .then(usuario => {
            sessionStorage.setItem("usuario", JSON.stringify(usuario));
            this.navCtrl.setRoot(HomePage, {usuario: this.usuario});
        })
        .catch(erro => {
            console.log(erro);
        })

  }

}
