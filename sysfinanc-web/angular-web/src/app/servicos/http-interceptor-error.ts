import {Injectable} from "@angular/core";
import { ConnectionBackend, RequestOptions, Request, RequestOptionsArgs, Response, Http, Headers} from "@angular/http";
import {Observable} from "rxjs/Rx";
import {Constantes} from '../utilitarios/constantes';
import { Router } from '@angular/router';
import {UsuarioVO} from '../dominio/vo/usuario-vo';
import {AlertaComponent} from '../componentes/mensagens/alert.component';
import {  DialogService } from "ng2-bootstrap-modal";

//esta classe deve extender de HttpInterceptor
@Injectable()
export class HttpInterceptorError extends Http  {

    private _router: Router;
    private _dialogService: DialogService;

    constructor(backend: ConnectionBackend, 
                defaultOptions: RequestOptions, 
                router: Router,
                dialogService: DialogService
                ) {
        super(backend, defaultOptions);
        this._router = router;
        this._dialogService = dialogService;
    }

    intercept(observable: Observable<Response>): Observable<Response> {

        return observable.catch((err, source) => {
            
            if (err.status  == 401 && ! err.url.endsWith('/login')) {
                this._router.navigate(['/login']);
                return Observable.throw(err);
            } else if (err.status == 403 && ! err.url.endsWith('/login')){
                this._router.navigate(['/login']);
                new AlertaComponent(this._dialogService).exibirMensagem(err._body);
                return null;
            } else if (err.status == 503 || err.status == 0){
                this._router.navigate(['/login']);
                new AlertaComponent(this._dialogService).exibirMensagem('O sistema está indisponível no momento. Favor comunicar ao responsável.');
                return null;
            }

            
        });
 
    }    

}
  

 