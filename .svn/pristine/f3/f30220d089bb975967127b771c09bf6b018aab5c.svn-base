import {ComponentFixture, TestBed} from '@angular/core/testing';
import {SharedModule} from '../../../../shared/shared.module';
import {CoreModule} from '../../../../core/core.module';
import {NotificationService} from '../../../../core/service/notification.service';
import {RouterTestingModule} from '@angular/router/testing';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {EmployerService} from '../../service/employer.service';
import {EmployerComponent} from './employer.component';
import {getMock} from '../../../../../mocks/employer/getMock';


describe('Component List: Employer', () => {
  let component: EmployerComponent;
  let fixture: ComponentFixture<EmployerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        CoreModule,
        SharedModule,
        RouterTestingModule.withRoutes([])
      ],
      declarations: [EmployerComponent],
      providers: [
        NotificationService,
        EmployerService
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Verifica a criação do componente', () => {
    expect(component).toBeTruthy();
  });

  it('Verifica a rota de adicionar', () => {
    const navigateSpy = spyOn((<any>component).router, 'navigate');
    component.onAdd();
    expect(navigateSpy).toHaveBeenCalledWith(['employer/add']);
  });

  it('Verifica a rota de editar', () => {
    const navigateSpy = spyOn((<any>component).router, 'navigate');
    component.onEdit(getMock);
    expect(navigateSpy).toHaveBeenCalledWith([`employer/edit/${getMock.id}`]);
  });

  it('Verifica a função de remover', () => {
    expect(() => component.onRemove(getMock)).not.toThrow();
  });

});
