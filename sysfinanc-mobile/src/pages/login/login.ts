import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {HomePage} from '../home/home';


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

  public usuario: String;
  public senha: String;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  efetuaLogin(){
    console.log(this.usuario + " " + this.senha);
    this.navCtrl.setRoot(HomePage, {usuario: this.usuario});
  }

}
