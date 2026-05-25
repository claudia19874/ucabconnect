import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroEmpresaComponent } from './registro-empresa.component';

describe('RegistroEmpresaComponent', () => {
  let component: RegistroEmpresaComponent;
  let fixture: ComponentFixture<RegistroEmpresaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistroEmpresaComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(RegistroEmpresaComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
