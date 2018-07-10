export class UtilData {
    public static incrementarDias(dataBase: Date, qtdDias: number): Date {
        let novaData: Date = new Date(dataBase);
        if (dataBase){
           novaData.setDate(dataBase.getDate() + qtdDias);
           return novaData;
        } else {
            return null;
        }
    }    

    public static decrementarDias(dataBase: Date, qtdDias: number): Date {
        let novaData: Date = new Date(dataBase);
        if (dataBase){
           let novoDia: number = dataBase.getDate() - qtdDias;
           novaData.setDate(novoDia);
           return novaData;
        } else {
            return null;
        }
    } 
    public static converterToString(data: Date): string {
        let dia: number = data.getDate();
        let mes: number = data.getMonth()+1;

        return (dia < 10 ? "0"+dia : dia)+"/"+
               (mes < 10 ? "0"+mes : mes)+"/"+
               data.getFullYear();
    }

    public getDiferencaAnos(dataBase: Date, dataValidar: Date): Number {
        if (dataBase && dataValidar && dataBase > dataValidar){
            return dataBase.getFullYear() - dataValidar.getFullYear();
        } else {
            return 0;
        }
    }

    public static somarMeses(dataBase: Date, qtdMeses: number): Date {
        if (dataBase){
          let mes: number = dataBase.getMonth() + qtdMeses;
          let novaData: Date = new Date();
          novaData.setDate(dataBase.getDate()); 
          if (mes > -1 && mes <= 11){
               novaData.setFullYear(dataBase.getFullYear());
               novaData.setMonth(mes);
          } else if (mes > 11){
               novaData.setFullYear(dataBase.getFullYear()+1);
               novaData.setMonth(mes - 12);
          } 
          return novaData;        
        } else {
            return null;
        }
    }

    public static getNomeDiasSemana(listaIdsDiasSemana: Array<string>, separador: string = ','): string {
        if (listaIdsDiasSemana && listaIdsDiasSemana.length > 0){
            let diasSemanaString: string = '';
            let indice = 0;
            listaIdsDiasSemana.forEach(diaSemana => {
                if (diaSemana === 'S'){
                    diasSemanaString+= this.arrayDiasSemana[indice] + separador +' ';
                }
                indice++;
            });
            return diasSemanaString.substr(0, diasSemanaString.length-2);
        } else {
            return "";
        }
    }
    
    private static arrayDiasSemana: Array<string> = ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"];

    public converterToDate(dataString: string): Date {
        if (dataString){
            let dadosData: Array<string> = dataString.split("/");
            let dia: number = Number.parseInt(dadosData[0]);
            let mes: number = Number.parseInt(dadosData[1]);
            let ano: number = Number.parseInt(dadosData[2]);
            let dataStringAux:string = ano+'-'+mes+'-'+dia;
            return new Date( Date.parse(dataStringAux) );
        } else {
            return null;
        }
    }
    
    public static converterDataUSAToBR(strData: string): string {
        let dados: string[] = strData.split('-');
        return dados[2]+'/'+dados[1]+'/'+dados[0];
    }
}