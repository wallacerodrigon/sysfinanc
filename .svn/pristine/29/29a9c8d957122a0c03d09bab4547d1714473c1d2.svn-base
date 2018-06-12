import {ComponentFixture, TestBed} from '@angular/core/testing';
import {SharedModule} from '../../../../shared/shared.module';
import {CoreModule} from '../../../../core/core.module';
import {NotificationService} from '../../../../core/service/notification.service';
import {RouterTestingModule} from '@angular/router/testing';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {PersistEmployerComponent} from './persist-employer.component';
import {EmployerService} from '../../service/employer.service';
import {getMock} from '../../../../../mocks/employer/getMock';


describe('Component: Employer', () => {

  let component: PersistEmployerComponent;
  let fixture: ComponentFixture<PersistEmployerComponent>;

  beforeEach(() => {

    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        CoreModule,
        SharedModule,
        RouterTestingModule.withRoutes([])
      ],
      declarations: [PersistEmployerComponent],
      providers: [
        NotificationService,
        EmployerService
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PersistEmployerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Verifica a criação do componente', () => {
    expect(component).toBeTruthy();
  });

  it('Verifica a função de voltar', () => {
    const navigateSpy = spyOn((<any>component).router, 'navigate');
    component.goBack();
    expect(navigateSpy).toHaveBeenCalledWith(['employer']);
  });

  it('Verifica o parse do modelo antes de salvar', () => {
    const transform = component.transformBeforeSave(getMock);
    expect(transform).toEqual(getMock);
  });

  it('Verifica o parse do modelo ao editar', () => {
    const transform = component.transformReceiveData(getMock);
    expect(transform).toEqual(getMock);
  });


});
