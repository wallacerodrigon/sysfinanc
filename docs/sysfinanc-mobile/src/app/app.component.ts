import { Component, ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { LoginPage } from '../pages/login/login';
import { SaldoPage } from '../pages/saldo/saldo';
import { RubricaPage } from '../pages/rubrica/rubrica';
import { Estatistica } from '../pages/estatistica/estatistica';
import { Simulacao } from '../pages/simulacao/simulacao';
import { Objetivo } from '../pages/objetivo/objetivo';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = LoginPage;

  public paginas = [
    { titulo: 'Lançamentos', componente: SaldoPage },
    { titulo: 'Rubricas', componente: RubricaPage },
 //  { titulo: 'Objetivos', componente: Objetivo },
  //  { titulo: 'Simulação', componente: Simulacao },
    //{ titulo: 'Estatísticas', componente: Estatistica },            
    { titulo: 'Sair', componente: LoginPage }
    
  ];
  
  @ViewChild(Nav) public nav: Nav;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

  abrePagina(pagina) {

    this.nav.push(pagina.componente);
  }
  
}

