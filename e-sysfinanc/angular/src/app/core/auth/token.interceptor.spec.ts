import {inject, TestBed} from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {HTTP_INTERCEPTORS, HttpClient} from '@angular/common/http';

import {TokenInterceptor} from './token.interceptor';
import {AuthService} from './auth.service';
import {DisabledService} from './disabled.service';

const authDisabled = new DisabledService();

describe('token.interceptor.service', () => {

  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule],
    providers: [{
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
      {
        provide: AuthService,
        useValue: authDisabled
      }
    ]
  }));

  describe('intercepta as requisicoes HTTP', () => {
    it('não deve ter o header Authorization quando não tiver um provider de auth habilitado', inject([HttpClient, HttpTestingController],
      (http: HttpClient, mock: HttpTestingController) => {

        http.get('/api').subscribe(response => expect(response).toBeTruthy());
        const request = mock.expectOne(req => (!req.headers.has('Authorization')));
        request.flush({data: 'test'});
        mock.verify();
      }));
  });

  afterEach(inject([HttpTestingController], (mock: HttpTestingController) => {
    mock.verify();
  }));

});
