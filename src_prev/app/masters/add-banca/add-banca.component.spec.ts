import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBancaComponent } from './add-banca.component';

describe('AddBancaComponent', () => {
  let component: AddBancaComponent;
  let fixture: ComponentFixture<AddBancaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddBancaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddBancaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
