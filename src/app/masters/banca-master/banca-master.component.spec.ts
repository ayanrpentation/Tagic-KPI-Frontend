import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BancaMasterComponent } from './banca-master.component';

describe('BancaMasterComponent', () => {
  let component: BancaMasterComponent;
  let fixture: ComponentFixture<BancaMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BancaMasterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BancaMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
