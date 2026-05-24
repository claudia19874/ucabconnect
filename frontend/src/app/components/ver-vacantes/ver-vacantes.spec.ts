import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerVacantes } from './ver-vacantes';

describe('VerVacantes', () => {
  let component: VerVacantes;
  let fixture: ComponentFixture<VerVacantes>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VerVacantes],
    }).compileComponents();

    fixture = TestBed.createComponent(VerVacantes);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
