import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TagicDashboardComponent } from './tagic-dashboard.component';

describe('TagicDashboardComponent', () => {
  let component: TagicDashboardComponent;
  let fixture: ComponentFixture<TagicDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TagicDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TagicDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
