import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditUploadedFileComponent } from './edit-uploaded-file.component';

describe('EditUploadedFileComponent', () => {
  let component: EditUploadedFileComponent;
  let fixture: ComponentFixture<EditUploadedFileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditUploadedFileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditUploadedFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
