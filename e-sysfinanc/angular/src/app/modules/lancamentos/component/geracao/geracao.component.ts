import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { NotificationService } from '../../../../core/service/notification.service';
import { LancamentoService } from '../../service/lancamento.service';
import { Rubrica } from '../../../rubricas/model/rubrica.class';
import { Observable } from 'rxjs/Observable';

import {startWith} from 'rxjs/operators/startWith';
import {map} from 'rxjs/operators/map';
import { GeracaoParcelasDto } from '../../model/geracao-parcelas-dto';
import { RubricaService } from '../../../rubricas/service/rubrica.service';


@Component({
  selector: 'app-geracao',
  templateUrl: './geracao.component.html',
  styleUrls: ['./geracao.component.css']
})
export class GeracaoComponent implements OnInit {

  private listaRubricas: Array<Rubrica> = [];

  private form: FormGroup;
  private dataId: string;
  private isUpdate: boolean;
  private isLoading: boolean;
  private validationErros: any = {};  
  private indiceAtivo: number = 0;
  private indicesDesabilitados: boolean[] = [false, true, true];

  @ViewChild("dataVencimentoStr") dataVencimentoStr: ElementRef;

  private habilitarTab(indice: number){
    this.indiceAtivo = indice;
    this.indicesDesabilitados[indice]= false;
    for(let i  = 0; i < 3; i++){
      this.indicesDesabilitados[i]= i === indice ? false : true;
    }    
  }

   /*filteredOptions: Observable<string[]>;
 
   filter(val: string): string[] {
     return this.options.filter(option =>
       option.toLowerCase().indexOf(val.toLowerCase()) === 0);
   }   */

  constructor(protected rubricaService: RubricaService,
    private router: Router,
    protected route: ActivatedRoute,
    protected notificationService: NotificationService,
    private formBuilder: FormBuilder) {
    }

    ngOnInit(){
      /*this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(val => this.filter(val))
      );*/

      this.route.data.subscribe(response => {
        if (response) {
          this.listaRubricas = response.listaRubricas;
         //console.log(response);
        }
      });      
      /*for(let i= 0; i < 10; i++){
         let r : Rubrica = new Rubrica(i, '', 'Rubrica' +i, null, null);
         this.listaRubricas.push(r);
      };*/
      this.formInit();
    }

    goConsultas():void {
      this.router.navigate(['lancamento']);
    }


    formInit() {
      this.form = new FormGroup({
        'idConta': new FormControl('', [Validators.required]),
        'dataVencimentoStr': new FormControl('', Validators.required),
        'quantidade': new FormControl('', [Validators.required, Validators.min(1)]),
        'valorVencimento': new FormControl('', Validators.required),
        'descricaoParcela': new FormControl('', [Validators.required, Validators.minLength(40), Validators.maxLength(60)])
      });
    }

    onGerarParcial() {
      if (this.form.valid) {
        //arrumar a data
        let data: GeracaoParcelasDto = new GeracaoParcelasDto();
        Object.assign(data, this.form.value);
        data.parcial = true;
        this.isLoading = true;
        this.rubricaService.gerarLancamentos(data)
          .then(dados => {
              console.log(dados);
              this.habilitarTab(1);
          })
          .catch(erro => {
            this.notificationService.notify('Erro interno.' + erro._data);
            this.isLoading = false;
          })
          
      } else {
        this.notificationService.notify('Preencha corretamente os campos conforme observação dos mesmos!');
      }
    }
  

   
  
    
}
