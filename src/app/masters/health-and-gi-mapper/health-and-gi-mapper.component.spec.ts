import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HealthAndGiMapperComponent } from './health-and-gi-mapper.component';

describe('HealthAndGiMapperComponent', () => {
  let component: HealthAndGiMapperComponent;
  let fixture: ComponentFixture<HealthAndGiMapperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HealthAndGiMapperComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HealthAndGiMapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
