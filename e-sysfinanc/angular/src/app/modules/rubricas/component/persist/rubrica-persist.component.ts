import { Component, OnInit } from '@angular/core';
import { Rubrica } from '../../model/rubrica.class';
import {PersistAbstract} from '../../../../shared/abstract/persist.abstract';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { RubricaService } from '../../service/rubrica.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NotificationService } from '../../../../core/service/notification.service';
import { TipoContaService } from '../../service/tipo-conta.service';
import { TipoConta } from '../../model/tipo-conta.class';


@Component({
  selector: 'app-rubrica-persist',
  templateUrl: './rubrica-persist.component.html',
  styleUrls: ['./rubrica-persist.component.css']
})
export class RubricaPersistComponent extends PersistAbstract<Rubrica> {

  private rubrica: Rubrica = new Rubrica();
  private listaTiposContas: Array<TipoConta> = [];

  constructor(protected rubricaService: RubricaService,
    private router: Router,
    protected route: ActivatedRoute,
    protected notificationService: NotificationService,
    private formBuilder: FormBuilder) {
        super(rubricaService, notificationService, route);
    }

  formInit(): FormGroup {
    return new FormGroup({
      'descricao': new FormControl('', [Validators.required, Validators.maxLength(50)]),
      'idTipoConta': new FormControl('', Validators.required),
      'despesa': new FormControl('', Validators.required)
    });
  }
  goBack(): void {
    this.router.navigate(['rubrica']);
  }
  
  transformReceiveData(rubrica: Rubrica): Rubrica {
    let r: Rubrica = new Rubrica();
    Object.assign(this.rubrica, rubrica);
    return this.rubrica;
  }  

  onReceiveData(): void {
    super.onReceiveData();
    this.listaTiposContas= [];
    this.route.data.subscribe(response => {
      if (response) {
        this.listaTiposContas = response.tipoContaData;
      }
    });
  }  

 
}
