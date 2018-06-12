import {Component, Input} from '@angular/core';
import {AbstractControl, AbstractControlDirective} from '@angular/forms';

@Component({
  selector: 'app-show-errors',
  template: `
   <ul *ngIf="shouldShowErrors()">
     <li style="color: red" *ngFor="let error of listOfErrors()">
       {{error}}
     </li>
   </ul>
 `,
})
export class ShowErrorsComponent {

  private static readonly errorMessages = {
    'required': () => 'Este campo é obrigatório',
    'minlength': (params) => 'O número mínimo de caracteres é ' + params.requiredLength,
    'maxlength': (params) => 'O número máximo de caarcteres é ' + params.requiredLength,
    'pattern': (params) => 'O padrão obrigatório é: ' + params.requiredPattern,
    'years': (params) => params.message,
    'countryCity': (params) => params.message,
    'uniqueName': (params) => params.message,
    'telephoneNumbers': (params) => params.message,
    'telephoneNumber': (params) => params.message
  };

  @Input()
  private control: AbstractControlDirective | AbstractControl;

  shouldShowErrors(): boolean {
    return this.control &&
      this.control.errors &&
      (this.control.dirty || this.control.touched);
  }

  listOfErrors(): string[] {
    return Object.keys(this.control.errors)
      .map(field => this.getMessage(field, this.control.errors[field]));
  }

  private getMessage(type: string, params: any) {
    return ShowErrorsComponent.errorMessages[type](params);
  }

}
