import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VisaoUsosComponent } from './visao-usos.component';

describe('VisaoUsosComponent', () => {
  let component: VisaoUsosComponent;
  let fixture: ComponentFixture<VisaoUsosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VisaoUsosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VisaoUsosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
