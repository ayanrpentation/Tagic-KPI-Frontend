import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DesigmstComponent } from './desigmst.component';

describe('DesigmstComponent', () => {
  let component: DesigmstComponent;
  let fixture: ComponentFixture<DesigmstComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DesigmstComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DesigmstComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
