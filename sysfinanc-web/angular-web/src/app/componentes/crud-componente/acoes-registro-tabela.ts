import { EventEmitter } from "@angular/core/src/event_emitter";

export class AcoesRegistroTabela {

    constructor(public nomeAcao: string, public classeCss: string, public eventoAcao?: Function, public callBack?:Function){

    }
}