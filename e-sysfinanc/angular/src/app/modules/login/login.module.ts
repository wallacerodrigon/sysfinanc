import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CoreModule} from '../../core/core.module';

import {AuthGuard} from '../../core/auth/auth.guard';
import { LoginComponent } from './component/login-component.component';

@NgModule({
  imports: [
    CoreModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [LoginComponent],
  exports: [LoginComponent],
})
export class LoginModule {
}
