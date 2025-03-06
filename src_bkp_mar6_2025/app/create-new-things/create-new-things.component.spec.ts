import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateNewThingsComponent } from './create-new-things.component';

describe('CreateNewThingsComponent', () => {
  let component: CreateNewThingsComponent;
  let fixture: ComponentFixture<CreateNewThingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateNewThingsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateNewThingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
