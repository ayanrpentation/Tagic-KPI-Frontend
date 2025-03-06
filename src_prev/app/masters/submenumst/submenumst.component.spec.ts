import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmenumstComponent } from './submenumst.component';

describe('SubmenumstComponent', () => {
  let component: SubmenumstComponent;
  let fixture: ComponentFixture<SubmenumstComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubmenumstComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubmenumstComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
