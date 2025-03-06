import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SdmComponent } from './sdm.component';

describe('SdmComponent', () => {
  let component: SdmComponent;
  let fixture: ComponentFixture<SdmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SdmComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SdmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
