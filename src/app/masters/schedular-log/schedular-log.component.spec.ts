import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchedularLogComponent } from './schedular-log.component';

describe('SchedularLogComponent', () => {
  let component: SchedularLogComponent;
  let fixture: ComponentFixture<SchedularLogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SchedularLogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SchedularLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
