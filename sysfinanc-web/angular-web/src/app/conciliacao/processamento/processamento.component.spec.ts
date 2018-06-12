import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessamentoComponent } from './processamento.component';

describe('ProcessamentoComponent', () => {
  let component: ProcessamentoComponent;
  let fixture: ComponentFixture<ProcessamentoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProcessamentoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcessamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
