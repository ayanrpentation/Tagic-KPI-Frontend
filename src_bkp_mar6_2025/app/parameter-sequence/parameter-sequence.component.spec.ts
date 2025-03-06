import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParameterSequenceComponent } from './parameter-sequence.component';

describe('ParameterSequenceComponent', () => {
  let component: ParameterSequenceComponent;
  let fixture: ComponentFixture<ParameterSequenceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParameterSequenceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ParameterSequenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
