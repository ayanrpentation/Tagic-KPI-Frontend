import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BranchmstComponent } from './branchmst.component';

describe('BranchmstComponent', () => {
  let component: BranchmstComponent;
  let fixture: ComponentFixture<BranchmstComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BranchmstComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BranchmstComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
