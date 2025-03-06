import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchedularAllDetailsComponent } from './schedular-all-details.component';

describe('SchedularAllDetailsComponent', () => {
  let component: SchedularAllDetailsComponent;
  let fixture: ComponentFixture<SchedularAllDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SchedularAllDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SchedularAllDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
