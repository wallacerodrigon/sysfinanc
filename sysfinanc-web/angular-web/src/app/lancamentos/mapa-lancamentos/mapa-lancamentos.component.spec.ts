import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapaLancamentosComponent } from './mapa-lancamentos.component';

describe('MapaLancamentosComponent', () => {
  let component: MapaLancamentosComponent;
  let fixture: ComponentFixture<MapaLancamentosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapaLancamentosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapaLancamentosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
