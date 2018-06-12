import {ErrorHandler, Injectable, NgZone} from '@angular/core';
import {HttpErrorResponse} from '@angular/common/http';
import {NotificationService} from './service/notification.service';
import * as Raven from 'raven-js';

@Injectable()
export class ApplicationErrorHandler extends ErrorHandler {

  constructor(private ns: NotificationService, private zone: NgZone) {
    super();
  }

  handleError(errorResponse: HttpErrorResponse | any) {
    Raven.captureException(errorResponse);
    this.zone.run(() => {
      if (errorResponse instanceof HttpErrorResponse) {
        switch (errorResponse.status) {
          case 401:
            this.ns.notify('Não autenticado, faça login novamente para continuar.');
            break;
          case 403:
            this.ns.notify('Não autorizado.');
            break;
          case 404:
            this.ns.notify('Recurso não encontrado. Verifique o console para mais detalhes');
            break;
          case 422:
            this.ns.notify('Erro');
            break;
          case 500:
            this.ns.notify('Ocorreu um erro no servidor.');
            break;
        }
      } else {
        this.ns.notify('Ocorreu um erro inesperado.');
      }
    });
    super.handleError(errorResponse);
  }
}
