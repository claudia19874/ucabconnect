import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CerrarVacante } from './cerrar-vacante';

describe('CerrarVacante', () => {
  let component: CerrarVacante;
  let fixture: ComponentFixture<CerrarVacante>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CerrarVacante],
    }).compileComponents();

    fixture = TestBed.createComponent(CerrarVacante);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
