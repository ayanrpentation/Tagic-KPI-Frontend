import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChequeBounceComponent } from './cheque-bounce.component';

describe('ChequeBounceComponent', () => {
  let component: ChequeBounceComponent;
  let fixture: ComponentFixture<ChequeBounceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChequeBounceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChequeBounceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
