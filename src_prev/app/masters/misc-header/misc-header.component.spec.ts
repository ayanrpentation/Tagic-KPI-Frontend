import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MiscHeaderComponent } from './misc-header.component';

describe('MiscHeaderComponent', () => {
  let component: MiscHeaderComponent;
  let fixture: ComponentFixture<MiscHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MiscHeaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MiscHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
