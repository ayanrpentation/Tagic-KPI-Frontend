import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadedFilesNewComponent } from './uploaded-files-new.component';

describe('UploadedFilesNewComponent', () => {
  let component: UploadedFilesNewComponent;
  let fixture: ComponentFixture<UploadedFilesNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UploadedFilesNewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadedFilesNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
