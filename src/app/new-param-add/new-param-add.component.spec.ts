import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewParamAddComponent } from './new-param-add.component';

describe('NewParamAddComponent', () => {
  let component: NewParamAddComponent;
  let fixture: ComponentFixture<NewParamAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewParamAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewParamAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
