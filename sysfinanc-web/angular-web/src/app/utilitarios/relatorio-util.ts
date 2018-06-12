import {  Headers, ResponseContentType, RequestOptions} from "@angular/http";

export class RelatorioUtil {

    public static getHeadersPDF(): RequestOptions{
        let headers = new Headers({ 
            'responseType': 'arraybuffer' 
        });
        let options = new RequestOptions({ headers: headers });
        // Ensure you set the responseType to Blob.
        options.responseType = ResponseContentType.Blob;
        
        return options;
    }

    public static geraArquivoRelatorio(fileBlob: any, fileName: string): void {
        let blob = new Blob([fileBlob], { 
            type: 'application/pdf' // must match the Accept type
        });
//        FileSaver.saveAs(blob, fileName); 
        
    }

    public static abrirRelatorioGerado(urlRelatorio: string): void {
        let janelaRelatorio = window.open(urlRelatorio, '');
    }


} 