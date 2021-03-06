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
export class HttpInterceptor extends Http  {

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

    request(url: string | Request, options?: RequestOptionsArgs): Observable<Response> {
        return this.intercept( super.request(url, options) );
    }

    get(url: string, options?: RequestOptionsArgs): Observable<Response> {
        url = this.updateUrl(url);
        return this.intercept( super.get(url, this.getRequestOptionArgs(options)) );
    }

    post(url: string, body: any, options?: RequestOptionsArgs): Observable<Response> {
        url = this.updateUrl(url);
        return this.intercept( super.post(url, body, this.getRequestOptionArgs(options)) );
    }

    put(url: string, body: string, options?: RequestOptionsArgs): Observable<Response> {
        url = this.updateUrl(url);
        return this.intercept( super.put(url, body, this.getRequestOptionArgs(options)) );
    }

    delete(url: string, options?: RequestOptionsArgs): Observable<Response> {
        url = this.updateUrl(url);
        return this.intercept( super.delete(url, this.getRequestOptionArgs(options)) );
    }

    private updateUrl(req: string) {
        return  Constantes.URL + req;
    }

    private getRequestOptionArgs(options?: RequestOptionsArgs) : RequestOptionsArgs {
        if (options == null) {
            options = new RequestOptions();
        }
        if (options.headers == null) {
            options.headers = new Headers();
            options.headers.append('Content-Type', 'application/json');
        }
        let usuario: string = sessionStorage.getItem("usuario");
        if (usuario){
            let usr: UsuarioVO = JSON.parse(usuario);
            options.headers.append('Authorization', 'Bearer '+ usr.token);
            options.headers.append('X-CSRF', usr.csrf);
        }

        return options;
    }

    private _removeTodosModais(){
        if (this._dialogService && this._dialogService != null){
            try {
                this._dialogService.removeAll();
            } catch(err){
                console.log(err);
            }

        }

    }


    intercept(observable: Observable<Response>): Observable<Response> {

        return observable.catch((err, source) => {
            
            if (err.status  == 401 && ! err.url.endsWith('/login')) {
                this._removeTodosModais();
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
            } else {
                return Observable.throw(err);
            }

            
        });
 
    }    

}
  

 