import {EventEmitter, Injectable, Injector} from '@angular/core';
import {MatSnackBar} from '@angular/material';

@Injectable()
export class NotificationService {
  notifier = new EventEmitter<string>();

  constructor(private injector: Injector) {
  }

  notify(message: string) {
    this.injector.get(MatSnackBar).open(message, 'OK', {
      duration: 2000,
    });
    this.notifier.emit(message);
  }

}
