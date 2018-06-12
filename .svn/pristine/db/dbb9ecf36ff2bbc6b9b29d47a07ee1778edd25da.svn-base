import {API_BASE} from '../../../app.constants';
import {async, inject, TestBed} from '@angular/core/testing';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {EmployerService} from './employer.service';
import {getMock} from '../../../../mocks/employer/getMock';
import {getAllMock} from '../../../../mocks/employer/getAllMock';
import {Paginator} from '../../../shared/model/paginator.model';
import {Employer} from '../interface/employer.interface';

describe('EmployerService', () => {

  const label = 'EmployerService';
  const url = 'employers';
  const getId = '1';
  let service: EmployerService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        HttpClientTestingModule
      ],
      providers: [
        EmployerService
      ]
    });
    service = TestBed.get(EmployerService);
    httpMock = TestBed.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it(`Verifica se o método GET de ${label} retorna um objeto`,
    async(
      inject([HttpClient, HttpTestingController], () => {
        service.getById(getId).subscribe((data) => {
          expect(data).toEqual(getMock);
        });
        const req = httpMock.expectOne(`${API_BASE}/${url}/${getMock.id}`);
        expect(req).toBeDefined();
        expect(req.request.method).toEqual('GET');
        expect(req.request.responseType).toEqual('json');
        req.flush(getMock);
      })
    )
  );

  it(`Verifica se o método GET_ALL de ${label} retorna um objeto do tipo paginator`,
    async(
      inject([HttpClient, HttpTestingController], () => {
        service.getAll('1').subscribe((res: Paginator<Employer>) => {
          expect(res.data.length).toEqual(1);
        });
        const req = httpMock.expectOne(`${API_BASE}/${url}?page=1`);
        expect(req).toBeDefined();
        expect(req.request.method).toEqual('GET');
        expect(req.request.responseType).toEqual('json');
        req.flush(getAllMock);
      })
    )
  );


  it(`Verifica se o método PUT de ${label} retorna um objeto`,
    async(
      inject([HttpClient, HttpTestingController], () => {
        service.update(getMock).subscribe((data) => {
          expect(data).toEqual(getMock);
        });
        const req = httpMock.expectOne(`${API_BASE}/${url}/${getMock.id}`);
        expect(req).toBeDefined();
        expect(req.request.method).toEqual('PUT');
        expect(req.request.responseType).toEqual('json');
        req.flush(getMock);
      })
    )
  );

  it(`Verifica se o método POST de ${label} retorna um objeto`,
    async(
      inject([HttpClient, HttpTestingController], () => {
        service.save(getMock).subscribe((data) => {
          expect(data).toEqual(getMock);
        });
        const req = httpMock.expectOne(`${API_BASE}/${url}`);
        expect(req).toBeDefined();
        expect(req.request.method).toEqual('POST');
        expect(req.request.responseType).toEqual('json');
        req.flush(getMock);
      })
    )
  );

  it(`Verifica se o método DELETE de ${label} retorna sucesso`,
    async(
      inject([HttpClient, HttpTestingController], () => {
        service.delete(getMock).subscribe((data) => {
          expect(data).toBeDefined();
        });
        const req = httpMock.expectOne(`${API_BASE}/${url}/${getMock.id}`);
        expect(req).toBeDefined();
        expect(req.request.method).toEqual('DELETE');
        expect(req.request.responseType).toEqual('json');
        req.flush(getMock);
      })
    )
  );

  it(`Verifica se o método sendCreate ${label} está implementado`, () => {
    expect(service.sendCreate).toBeDefined();
    expect(() => service.sendCreate([])).toThrow();
  });

  it(`Verifica se o método sendDelete ${label} está implementado`, () => {
    expect(service.sendDelete).toBeDefined();
    expect(() => service.sendDelete([])).toThrow();
  });

  it(`Verifica se o método sendUpdate ${label} está implementado`, () => {
    expect(service.sendUpdate).toBeDefined();
    expect(() => service.sendUpdate([])).toThrow();
  });


});
