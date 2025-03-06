import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsermanualDownloadComponent } from './usermanual-download.component';

describe('UsermanualDownloadComponent', () => {
  let component: UsermanualDownloadComponent;
  let fixture: ComponentFixture<UsermanualDownloadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsermanualDownloadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsermanualDownloadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
