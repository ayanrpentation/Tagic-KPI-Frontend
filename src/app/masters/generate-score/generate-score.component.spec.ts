import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerateScoreComponent } from './generate-score.component';

describe('GenerateScoreComponent', () => {
  let component: GenerateScoreComponent;
  let fixture: ComponentFixture<GenerateScoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GenerateScoreComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GenerateScoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
