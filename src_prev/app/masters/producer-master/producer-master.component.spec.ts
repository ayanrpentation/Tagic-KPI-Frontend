import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProducerMasterComponent } from './producer-master.component';

describe('ProducerMasterComponent', () => {
  let component: ProducerMasterComponent;
  let fixture: ComponentFixture<ProducerMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProducerMasterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProducerMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
