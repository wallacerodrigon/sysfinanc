import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RelLancamentosRubricaComponent } from './rel-lancamentos-rubrica.component';

describe('RelLancamentosRubricaComponent', () => {
  let component: RelLancamentosRubricaComponent;
  let fixture: ComponentFixture<RelLancamentosRubricaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RelLancamentosRubricaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RelLancamentosRubricaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
