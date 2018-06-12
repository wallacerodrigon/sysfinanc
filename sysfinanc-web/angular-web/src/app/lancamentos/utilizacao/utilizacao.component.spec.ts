import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UtilizacaoComponent } from './utilizacao.component';

describe('UtilizacaoComponent', () => {
  let component: UtilizacaoComponent;
  let fixture: ComponentFixture<UtilizacaoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UtilizacaoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UtilizacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
