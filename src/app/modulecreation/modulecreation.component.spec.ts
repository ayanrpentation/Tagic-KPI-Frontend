import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModulecreationComponent } from './modulecreation.component';

describe('ModulecreationComponent', () => {
  let component: ModulecreationComponent;
  let fixture: ComponentFixture<ModulecreationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModulecreationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModulecreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
