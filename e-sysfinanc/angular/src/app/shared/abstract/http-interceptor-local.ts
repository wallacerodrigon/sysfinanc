import {Injectable} from "@angular/core";
import { ConnectionBackend, RequestOptions, Request, RequestOptionsArgs, Response, Http, Headers} from "@angular/http";
import {Observable} from "rxjs/Rx";
import { Router } from '@angular/router';

import { API_BASE } from '../../app.constants';


@Injectable()
export class HttpInterceptorLocal extends Http  {

    private _router: Router;

    constructor(backend: ConnectionBackend, 
                defaultOptions: RequestOptions, 
                router: Router
                ) {
        super(backend, defaultOptions);
        this._router = router;
    }

    request(url: string | Request, options?: RequestOptionsArgs): Observable<Response> {
        return this.intercept( super.request(url, options) );
    }

    get(url: string, options?: RequestOptionsArgs): Observable<Response> {
        url = this.updateUrl(url);
        return this.intercept( super.get(url, this.getRequestOptionArgs(options)) );
    }

    post(url: string, body: string, options?: RequestOptionsArgs): Observable<Response> {
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
        return `${API_BASE}/req`;
    }

    private getRequestOptionArgs(options?: RequestOptionsArgs) : RequestOptionsArgs {
        if (options == null) {
            options = new RequestOptions();
        }
        if (options.headers == null) {
            options.headers = new Headers();
        }
        options.headers.append('Content-Type', 'application/json');
        let token = null;
      //  if (usuario){
            //let usr: LoginVO = JSON.parse(usuario);
           // token = usr.token;
      //  }

        options.headers.append('x-access-token', token);
        return options;
    }

    intercept(observable: Observable<Response>): Observable<Response> {

        return observable.catch((err, source) => {
            this._router.navigate(['/login']);
            return Observable.throw(err);
            
        });
 
    }    

}
  

 