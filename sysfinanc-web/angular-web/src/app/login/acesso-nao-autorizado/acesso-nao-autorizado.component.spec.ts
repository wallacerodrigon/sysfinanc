import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AcessoNaoAutorizadoComponent } from './acesso-nao-autorizado.component';

describe('AcessoNaoAutorizadoComponent', () => {
  let component: AcessoNaoAutorizadoComponent;
  let fixture: ComponentFixture<AcessoNaoAutorizadoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AcessoNaoAutorizadoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AcessoNaoAutorizadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
