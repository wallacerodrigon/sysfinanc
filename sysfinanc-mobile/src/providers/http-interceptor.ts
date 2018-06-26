import {Injectable} from "@angular/core";
import { ConnectionBackend, RequestOptions, Request, RequestOptionsArgs, Response, Http, Headers} from "@angular/http";
import {Observable} from "rxjs/Rx";
import {Constantes} from '../utilitarios/constantes';
import { LoginPage } from "../../pages/login/login";
import { NavController } from "ionic-angular";
import { AlertController } from "ionic-angular/components/alert/alert-controller";

@Injectable()
export class HttpInterceptor extends Http  {

    private alertCtrl: AlertController;

    constructor(backend: ConnectionBackend, 
                defaultOptions: RequestOptions, 
                public navCtrl: NavController
                ) {
        super(backend, defaultOptions);
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
        return req;
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
            //let usr: UsuarioVO = JSON.parse(usuario);
            let token = "";
            options.headers.append('Authorization', 'Bearer '+ token);
        }

        return options;
    }

    private irParaLogin(){
        this.navCtrl.setRoot(LoginPage);        
    }

    intercept(observable: Observable<Response>): Observable<Response> {

        return observable.catch((err, source) => {
            
            if (err.status  == 401 && ! err.url.endsWith('/login')) {
                this.irParaLogin();
            } else if (err.status == 403 && ! err.url.endsWith('/login')){
                this.exibirMensagem('Sessão expirada', 'Logue novamente no sistema!');
                this.irParaLogin();
            } else if (err.status == 503 || err.status == 0){
                this.exibirMensagem('Indisponibilidade', 'O sistema está indisponível no momento. Favor comunicar ao responsável!');                
                this.irParaLogin();
            }

            return Observable.throw(err);
            
        });
 
    }    

    private exibirMensagem(titulo: string, mensagem: string){
        this.alertCtrl.create({
            buttons:["Ok"],
            title: titulo,
            subTitle: mensagem
        })
        .present();        
    }

}
  

 