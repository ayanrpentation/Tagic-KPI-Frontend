import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChannelmstComponent } from './channelmst.component';

describe('ChannelmstComponent', () => {
  let component: ChannelmstComponent;
  let fixture: ComponentFixture<ChannelmstComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChannelmstComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChannelmstComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
