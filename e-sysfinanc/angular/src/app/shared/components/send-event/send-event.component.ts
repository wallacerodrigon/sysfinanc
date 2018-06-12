import {Component, OnInit} from '@angular/core';
import {MatDialogRef} from '@angular/material';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Options} from '../../model/options.model';

export const ACTION_CREATE = 'CREATE';
export const ACTION_UPDATE = 'UPDATE';
export const ACTION_DELETE = 'DELETE';

@Component({
  selector: 'app-send-event',
  templateUrl: 'send-event.component.html',
})
export class SendEventComponent implements OnInit {


  form: FormGroup;
  options: Array<Options> = [
    {
      label: 'Criar',
      value: ACTION_CREATE
    },
    {
      label: 'Atualizar',
      value: ACTION_UPDATE
    },
    {
      label: 'Remover',
      value: ACTION_DELETE
    }
  ];

  constructor(public dialogRef: MatDialogRef<SendEventComponent>,
              private formBuilder: FormBuilder) {
  }

  cancel(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
    this.formInit();
  }

  formInit(): void {
    this.form = this.formBuilder.group({
      action: this.formBuilder.control('', [Validators.required]),
    });
  }

  onSubmit({value, valid}: { value: { action: string }, valid: boolean }): void {
    this.dialogRef.close(value.action);
  }

}
