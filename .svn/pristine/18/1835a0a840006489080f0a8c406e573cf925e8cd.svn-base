import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import 'rxjs/add/operator/map';
import {FormsModule} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import {HttpModule, Http, XHRBackend, RequestOptions} from '@angular/http';

//HTTP_INTERCEPTORS
import {HttpFactory} from './servicos/http-factory';
import {HttpInterceptor } from './servicos/http-interceptor';

//modulos externos
import { BootstrapModalModule } from 'ng2-bootstrap-modal';
import {NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TextMaskModule } from 'angular2-text-mask';
import { DialogService } from "ng2-bootstrap-modal";

//serviços
import {AuthGuard} from './servicos/auth-guard.service';

//modulos internos
import {HomeModule} from './home/home.module';
import {LoginModule} from './login/login.module';
import {DashboardModule} from './dashboard/dashboard.module';
import {ComponentesModule} from './componentes/componentes.module';
import {LancamentosModule} from './lancamentos/lancamentos.module';

//rotas
import {RoutesRoutingModule} from './routes-geral-module'; 
import { ConciliacaoModule } from './conciliacao/conciliacao.module';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    //externos
    BrowserModule,
    FormsModule, 
    HttpModule, 
    CommonModule,
    BootstrapModalModule, 
    NgbModule.forRoot(),

    //modulos do sistema
    LoginModule, 
    HomeModule, 
    DashboardModule, 
    ComponentesModule, TextMaskModule, 
    LancamentosModule,
    ConciliacaoModule,

    //rotas
    RoutesRoutingModule /*deve ser a última para evitar conflitos*/ 
  ],
  providers: [
        {
            provide: HttpInterceptor,
            useFactory: HttpFactory,
            deps: [XHRBackend, RequestOptions, Router, DialogService]
        },
        AuthGuard
    ],
  bootstrap: [AppComponent]
})
export class AppModule {  



}
