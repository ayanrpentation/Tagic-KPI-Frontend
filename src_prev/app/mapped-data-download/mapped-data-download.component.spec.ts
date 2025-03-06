import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MappedDataDownloadComponent } from './mapped-data-download.component';

describe('MappedDataDownloadComponent', () => {
  let component: MappedDataDownloadComponent;
  let fixture: ComponentFixture<MappedDataDownloadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MappedDataDownloadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MappedDataDownloadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
