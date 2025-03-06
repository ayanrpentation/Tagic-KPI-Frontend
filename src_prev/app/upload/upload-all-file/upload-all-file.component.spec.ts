import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadAllFileComponent } from './upload-all-file.component';

describe('UploadAllFileComponent', () => {
  let component: UploadAllFileComponent;
  let fixture: ComponentFixture<UploadAllFileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UploadAllFileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadAllFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
