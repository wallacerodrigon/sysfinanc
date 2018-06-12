import { DtoPadrao } from "app/dominio/dto/dto-padrao";

export class RecuperaUsuarioLoginSenhaDto extends DtoPadrao {

    constructor(public login: string = null, public senha: string = null){
        super();
    }
}