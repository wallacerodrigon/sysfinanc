import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Options} from '../../model/options.model';

@Component({
  selector: 'app-seccional-change',
  templateUrl: 'seccional-change.component.html',
  styleUrls: ['./seccional-change.component.scss']
})
export class SeccionalChangeComponent implements OnInit {

  currentSeccional: string = 'TRF1';

  @Output() onChangeSeccional = new EventEmitter<Options>();

  options: Array<Options> = [
    {
      label: 'TRF1ª',
      value: 'TRF1'
    },
    {
      label: 'SJAC',
      value: 'SJAC'
    },
    {
      label: 'SJAM',
      value: 'SJAM'
    },
    {
      label: 'SJAP',
      value: 'SJAP'
    },
    {
      label: 'SJBA',
      value: 'SJBA'
    },
    {
      label: 'SJDF',
      value: 'SJDF'
    },
    {
      label: 'SJGO',
      value: 'SJGO'
    },
    {
      label: 'SJMA',
      value: 'SJMA'
    },
    {
      label: 'SJMG',
      value: 'SJMG'
    },
    {
      label: 'SJMT',
      value: 'SJMT'
    },
    {
      label: 'SJPA',
      value: 'SJPA'
    },
    {
      label: 'SJPI',
      value: 'SJPI'
    },
    {
      label: 'SJRO',
      value: 'SJRO'
    },
    {
      label: 'SJRR',
      value: 'SJRR'
    },
    {
      label: 'SJTO',
      value: 'SJTO'
    }
  ];

  change() {
    this.onChangeSeccional.emit(this.options.find(o => o.value == this.currentSeccional));
  }

  ngOnInit() {
    this.change();
  }
}
