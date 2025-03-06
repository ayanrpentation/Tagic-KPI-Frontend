import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CorUploadComponent } from './cor-upload.component';

describe('CorUploadComponent', () => {
  let component: CorUploadComponent;
  let fixture: ComponentFixture<CorUploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CorUploadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CorUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
