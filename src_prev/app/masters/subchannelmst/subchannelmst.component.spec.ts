import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubchannelmstComponent } from './subchannelmst.component';

describe('SubchannelmstComponent', () => {
  let component: SubchannelmstComponent;
  let fixture: ComponentFixture<SubchannelmstComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubchannelmstComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubchannelmstComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
