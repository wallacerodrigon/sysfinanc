import {XHRBackend, Http, RequestOptions} from "@angular/http";
import {HttpInterceptor} from "./http-interceptor";
import { NavController } from "ionic-angular/navigation/nav-controller";

export function HttpFactory(xhrBackend: XHRBackend, requestOptions: RequestOptions, navCtrl: NavController): Http {
    return new HttpInterceptor(xhrBackend, requestOptions, navCtrl);
}