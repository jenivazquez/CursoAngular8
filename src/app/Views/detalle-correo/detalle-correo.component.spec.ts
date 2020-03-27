import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleCorreoComponent } from './detalle-correo.component';

describe('DetalleCorreoComponent', () => {
  let component: DetalleCorreoComponent;
  let fixture: ComponentFixture<DetalleCorreoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetalleCorreoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleCorreoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
