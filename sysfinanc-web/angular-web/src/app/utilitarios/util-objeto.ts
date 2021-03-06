import { Observable } from "rxjs/Observable";

export class UtilObjeto {

    public static clonarObjeto(objeto: any): any {
        let jsonObject: string = JSON.stringify(objeto);
        let novoObjeto: any = JSON.parse(jsonObject);
        return novoObjeto;
    }

    public static coalesce(objeto: any, valorSubstituicao: any): Observable<any> {
        return (objeto == null) ? valorSubstituicao : objeto;
    }

    public static transformar(elem: any, target: any): any {
        Object.assign(target, elem);
        return target;
    }

}