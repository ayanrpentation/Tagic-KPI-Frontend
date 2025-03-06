import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MiscDetailsComponent } from './misc-details.component';

describe('MiscDetailsComponent', () => {
  let component: MiscDetailsComponent;
  let fixture: ComponentFixture<MiscDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MiscDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MiscDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
