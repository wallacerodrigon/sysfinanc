import {AuthGuard} from './auth.guard';
import {DisabledService} from './disabled.service';
import {fakeAsync} from '@angular/core/testing';
import {Observable} from 'rxjs/Observable';

describe('core auth.guard', () => {

  const authDisabled = new DisabledService();

  it('Verifica canActivateChild implementação da função', fakeAsync(() => {
    authDisabled.isEnable = false;
    const authGuard = new AuthGuard(null, authDisabled);

    const spy = spyOn(authGuard, 'canActivateChild').and.returnValue(
      Observable.of(false)
    );
    expect(spy.calls.any()).toEqual(false);
  }));

  it('Verifica canActivateChild implementação da função', fakeAsync(() => {
    authDisabled.isEnable = true;
    authDisabled.isAuthenticate = () => true;
    const authGuard = new AuthGuard(null, authDisabled);
    const spy = spyOn(authGuard, 'canLoad').and.returnValue(
      Observable.of(true)
    );
    expect(spy.calls.any()).toEqual(false);
  }));

});
