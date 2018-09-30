import {XHRBackend, Http, RequestOptions} from "@angular/http";
import {HttpInterceptor} from "./http-interceptor";
import { Router } from '@angular/router';
import { DialogComponent, DialogService } from "ng2-bootstrap-modal";
import { HttpInterceptorError } from "./http-interceptor-error";


export function HttpFactory(xhrBackend: XHRBackend, requestOptions: RequestOptions, router: Router, dialogService: DialogService): Http {
    return new HttpInterceptor(xhrBackend, requestOptions, router, dialogService);
}

export function HttpFactoryError(xhrBackend: XHRBackend, requestOptions: RequestOptions, router: Router, dialogService: DialogService): Http {
    return new HttpInterceptorError(xhrBackend, requestOptions, router, dialogService);
}