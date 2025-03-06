import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewkpiComponent } from './viewkpi.component';

describe('ViewkpiComponent', () => {
  let component: ViewkpiComponent;
  let fixture: ComponentFixture<ViewkpiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewkpiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewkpiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
