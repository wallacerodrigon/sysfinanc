export class Formatadores {

    public static formatarCpf(cpf: string): string {
        let v: string = cpf;
        v=v.replace(/\D/g,"");             //Remove tudo o que não é dígito
        v=v.replace(/^(\d{2})(\d)/g,"($1) $2"); //Coloca parênteses em volta dos dois primeiros dígitos
        v=v.replace(/(\d)(\d{4})$/,"$1-$2");    //Coloca hífen entre o quarto e o quinto dígitos
        return v;
    }

    public static formatarTelefone(fone: string): string {
        if (fone === null){
            return '';
        }
        let v: string = fone;
        v=v.replace(/\D/g,"");             //Remove tudo o que não é dígito
        v=v.replace(/^(\d{2})(\d)/g,"($1) $2"); //Coloca parênteses em volta dos dois primeiros dígitos
        v=v.replace(/(\d)(\d{4})$/,"$1-$2");    //Coloca hífen entre o quarto e o quinto dígitos
        return v;
    }

    public static formatarCelular(fone: string): string {
        if (fone === null){
            return '';
        }
        let v: string = fone;
        v=v.replace(/\D/g,"");             //Remove tudo o que não é dígito
        v=v.replace(/^(\d{2})(\d)/g,"($1) $2"); //Coloca parênteses em volta dos dois primeiros dígitos
        v=v.replace(/(\d)(\d{4})$/,"$1-$2");    //Coloca hífen entre o quarto e o quinto dígitos
        return v;
    }

    public static formataNumero(valor: string): number {
        if (valor && valor.trim().length > 0){
            valor = valor.replace('.', '');
            return Number.parseFloat( valor.replace(',', '.') );
        } else {
            return null;
        }
    }    

    public static formataNumeroToString(valor: number): string {
        if (valor){
            return valor.toString().replace('.', ',');
        } else {
            return null;
        }
    }  

    public static formataMoeda(valor: number): string {
        let value:string = valor.toString();
        let strAposPonto: string = value.indexOf('.') > -1 ? value.slice(value.indexOf('.')+1) : ",00";

        if (strAposPonto.length != 2) {
            //value = value.slice(0, value.indexOf('.')+2);            
        }            
        return this.formatarMoedaAoDigitar({value});
    }

 public static formatarMoedaAoDigitar(z){
	let v = z.value;
	
	if(z.value.length <= 4){
		
		v=v.replace(/\D/g,"");
		v=v.replace(/(\d{1})(\d{17})$/,"$1.$2");
		v=v.replace(/(\d{1})(\d{14})$/,"$1.$2");
		v=v.replace(/(\d{1})(\d{11})$/,"$1.$2");
		v=v.replace(/(\d{1})(\d{8})$/,"$1.$2");
		v=v.replace(/(\d{1})(\d{5})$/,"$1.$2");
		v=v.replace(/(\d{1})(\d{1,2})$/,"$1,$2");
		z.value = v;
		return z.value;
	}

	let t = '';
	let verificador = false;
	for (var i = 0; i < z.value.length; i++) { 
	    if(z.value[i] !='0' && z.value[i] !=',' && z.value[i] !='.'){
	    	t += z.value[i];
	    	verificador = true;
	    	continue;
	    }
	    if(verificador){
	    	t += z.value[i];
		}
	}
	v = t;

	v=v.replace(/\D/g,"");
	v=v.replace(/(\d{1})(\d{17})$/,"$1.$2");
	v=v.replace(/(\d{1})(\d{14})$/,"$1.$2");
	v=v.replace(/(\d{1})(\d{11})$/,"$1.$2");
	v=v.replace(/(\d{1})(\d{8})$/,"$1.$2");
	v=v.replace(/(\d{1})(\d{5})$/,"$1.$2");
	v=v.replace(/(\d{1})(\d{1,2})$/,"$1,$2");
	z.value = v;
	
	return z.value;

	
} 
      
}