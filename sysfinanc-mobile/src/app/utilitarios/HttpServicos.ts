import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class HttpServicos {

    constructor(private _http: Http){

    }

    get(url: string){
        return this._http
            .get(url)
            .map(res => res.json())
            .toPromise()    
    }

    post(url: string, body: any): Promise<any>{
        return this._http
                .post(url, body)
                .toPromise();

    }

    put(url: string, body: any){
        return this._http
            .put(url, body)
            .toPromise();

    }

    delete(url: string, body: any){
        return this._http
            .delete(url, body)
            .toPromise();

    }

    postUrl(url: string){
        return this.post(url, {});

    }

    putUrl(url: string){
        return this.put(url, {});
    }    

    deleteUrl(url: string){
        return this.delete(url, {});
    }    
    
}