//import { GerenciadorPadraoVO } from "./gerenciador-padrao-vo";


export class UsuarioVO  {

	constructor(
                public nome: string = null,
                public login: string = null,
                public token: string = null,
                public csrf: string = null
                ){
        
    }


 
}