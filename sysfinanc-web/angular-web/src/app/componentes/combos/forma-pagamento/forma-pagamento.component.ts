import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'combo-forma-pagamento',
  templateUrl: './forma-pagamento.component.html',
  styleUrls: ['./forma-pagamento.component.css']
})
export class FormaPagamentoComponent implements OnInit {

  @Input() formGroup: FormGroup;
  
  constructor(private formBuilder: FormBuilder) { 
    this.formGroup = this.formBuilder.group({
      formaPagamento: this.formBuilder.control('', [])
    })
  }

  ngOnInit() {
  }

}
