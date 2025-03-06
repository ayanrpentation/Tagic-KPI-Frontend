import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMappermasterComponent } from './add-mappermaster.component';

describe('AddMappermasterComponent', () => {
  let component: AddMappermasterComponent;
  let fixture: ComponentFixture<AddMappermasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddMappermasterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddMappermasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
