import {ErrorHandler, LOCALE_ID, ModuleWithProviders, NgModule} from '@angular/core';
import {CommonModule, registerLocaleData} from '@angular/common';
import {NotificationService} from './service/notification.service';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MaterialModule} from './material/material.module';
import {ApplicationErrorHandler} from './app.error-handler';
import {FlexLayoutModule} from '@angular/flex-layout';
import {RouterModule} from '@angular/router';
import ptBr from '@angular/common/locales/pt';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {TextMaskModule} from 'angular2-text-mask';
import {KeycloakService} from './auth/keycloak.service';
import {TokenInterceptor} from './auth/token.interceptor';
import {AuthService} from './auth/auth.service';
import {AuthGuard} from './auth/auth.guard';
import {AuthMethod, environment} from '../../environments/environment';
import {DisabledService} from './auth/disabled.service';


registerLocaleData(ptBr);

export function AuthFactory() {
    return new DisabledService();
}

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    HttpClientModule,
    RouterModule,
    TextMaskModule
  ],
  providers: [AuthGuard, {provide: AuthService, useFactory: AuthFactory}, {
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptor,
    multi: true
  }, {provide: ErrorHandler, useClass: ApplicationErrorHandler}, {provide: LOCALE_ID, useValue: 'pt'}],
  exports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    HttpClientModule,
    RouterModule,
    TextMaskModule
  ]
})
export class CoreModule {

  static forRoot(): ModuleWithProviders {
    return {
      ngModule: CoreModule,
      providers: [NotificationService, AuthGuard]
    };
  }
}
