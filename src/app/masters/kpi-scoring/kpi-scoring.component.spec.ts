import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KpiScoringComponent } from './kpi-scoring.component';

describe('KpiScoringComponent', () => {
  let component: KpiScoringComponent;
  let fixture: ComponentFixture<KpiScoringComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KpiScoringComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KpiScoringComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
