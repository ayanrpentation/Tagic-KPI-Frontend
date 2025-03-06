import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BankassuranceComponent } from './bankassurance.component';

describe('BankassuranceComponent', () => {
  let component: BankassuranceComponent;
  let fixture: ComponentFixture<BankassuranceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BankassuranceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BankassuranceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
