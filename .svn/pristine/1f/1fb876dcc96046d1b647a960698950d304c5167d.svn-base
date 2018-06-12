import {XHRBackend, Http, RequestOptions} from "@angular/http";
import {HttpInterceptorLocal} from "./http-interceptor-local";
import { Router } from '@angular/router';

export function HttpFactory(xhrBackend: XHRBackend, requestOptions: RequestOptions, 
    router: Router): Http {
    return new HttpInterceptorLocal(xhrBackend, requestOptions, router);
} 