import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpModule, ConnectionBackend, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

//--paginas--
import { MyApp } from './app.component';

import { LoginModule } from '../pages/login/login.module';
import { HomeModule } from '../pages/home/home.module';
import { SaldoModule } from '../pages/saldo/saldo.module';
import { ResumoModule } from '../pages/resumo/resumo.module';
import { LancamentoModule } from '../pages/lancamento/lancamento.module';
import { RubricaModule } from '../pages/rubrica/rubrica.module';

import {LancamentoService} from '../providers/lancamento-service';
import {RubricaService} from '../providers/rubrica-service';

import {HttpServicos} from '../app/utilitarios/HttpServicos';
import { HttpInterceptor } from '../providers/http-interceptor';
import { HttpFactory } from '../providers/http-factory';
import { NavController } from 'ionic-angular/navigation/nav-controller';
import { UsuarioService } from '../providers/usuario-service';

@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule,
    RubricaModule,
    LoginModule,
    HomeModule,
    SaldoModule,
    LancamentoModule,
    ResumoModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [
    {
      provide: HttpInterceptor,
      useFactory: HttpFactory,
      deps: [ConnectionBackend, RequestOptions, NavController]
    },      
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    LancamentoService,
    HttpServicos,
    RubricaService,
    UsuarioService
  ]
})
export class AppModule {}
