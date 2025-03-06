import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SdmUnmappedDetailsComponent } from './sdm-unmapped-details.component';

describe('SdmUnmappedDetailsComponent', () => {
  let component: SdmUnmappedDetailsComponent;
  let fixture: ComponentFixture<SdmUnmappedDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SdmUnmappedDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SdmUnmappedDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
