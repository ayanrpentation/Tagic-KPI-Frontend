import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaperMasterComponent } from './maper-master.component';

describe('MaperMasterComponent', () => {
  let component: MaperMasterComponent;
  let fixture: ComponentFixture<MaperMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MaperMasterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MaperMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
