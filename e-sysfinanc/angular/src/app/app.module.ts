import {BrowserModule} from '@angular/platform-browser';
import {PreloadAllModules, RouterModule,Router} from '@angular/router';
import {NgModule} from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AppComponent} from './app.component';
import {CoreModule} from './core/core.module';
import {ROUTES} from './app.routes';
import {SharedModule} from './shared/shared.module';
import {UserModule} from './modules/user/user.module';
import {EmployerModule} from './modules/employer/employer.module';
//import {DashboardModule} from './modules/dashboard/dashboard.module';
import { LoginModule } from './modules/login/login.module';
import { RubricasModule } from './modules/rubricas/rubricas.module';

//HTTP_INTERCEPTORS
import {HttpFactory} from './shared/abstract/http-factory';
import {HttpInterceptorLocal } from './shared/abstract/http-interceptor-local';

import {HttpModule, Http, XHRBackend, RequestOptions} from '@angular/http';

@NgModule({
  declarations: [
    AppComponent
    
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    SharedModule,
    CoreModule.forRoot(),
    RouterModule.forRoot(ROUTES, {preloadingStrategy: PreloadAllModules}),
   // DashboardModule,
    UserModule,
    EmployerModule,
    LoginModule,
    RubricasModule
  ],
  exports: [],
  providers: [
    {
      provide: HttpInterceptorLocal,
      useFactory: HttpFactory,
      deps: [XHRBackend, RequestOptions, Router]
  },
  ],

  bootstrap: [AppComponent]
})
export class AppModule {
}
