import {OnInit} from '@angular/core';
import {NotificationService} from '../../core/service/notification.service';
import {ActivatedRoute} from '@angular/router';
import {FormControl, FormGroup, FormGroupDirective, NgForm} from '@angular/forms';
import {HttpErrorResponse} from '@angular/common/http';
import {ErrorStateMatcher} from '@angular/material';

interface Persist<T> {
  save(T);

  update(T);
}

export abstract class PersistAbstract<T> implements OnInit {

  form: FormGroup;
  data: T;
  dataId: string;
  isUpdate: boolean;
  isLoading: boolean;
  validationErros: any = {};


  validate = (data: any): ErrorStateMatcher => {
    const errorState: ErrorStateMatcher = {
      isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
        return !!data;
      }
    };
    return errorState;
  }

  onSuccess = (): void => {
    this.isLoading = false;
    this.notificationService.notify('Salvo com sucesso!');
    this.goBack();
  }

  onError = (errorResponse: HttpErrorResponse): void => {
    this.isLoading = false;
    if (errorResponse.status === 422 && errorResponse.error) {
      this.validationErros = errorResponse.error.errors;
      return this.notificationService.notify(errorResponse.error.message || 'Verifique os campos informados');
    }
    throw errorResponse;
  }

  onComplete = (): void => {
    this.isLoading = false;
  }

  constructor(protected dataService: Persist<T>,
              protected notificationService: NotificationService,
              protected route: ActivatedRoute) {
  }

  ngOnInit() {
    this.form = this.formInit();
    this.onReceiveData();
  }

  onReceiveData(): void {
    this.route.data.subscribe((data: { responseData: T }) => {
      if (data.responseData) {
        this.dataId = data.responseData['id'];
        this.form.patchValue(this.transformReceiveData(data.responseData));
        this.isUpdate = true;
      }
    });
  }

  abstract formInit(): FormGroup;

  abstract goBack(): void;

  onSave() {
    if (this.form.valid) {
      let data = Object.assign({}, this.form.value) as T;
      data['id'] = this.dataId;
      data = this.transformBeforeSave(data);
      this.isLoading = true;
      if (this.isUpdate) {
        this.dataService.update(data).subscribe(this.onSuccess, this.onError, this.onComplete);
      } else {
        this.dataService.save(data).subscribe(this.onSuccess, this.onError, this.onComplete);
      }
    } else {
      this.notificationService.notify('Preencha corretamente os campos!');
    }
  }

  transformBeforeSave(data: T): T {
    return data;
  }

  transformReceiveData(data: T): T {
    return data;
  }

}
