import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenumstComponent } from './menumst.component';

describe('MenumstComponent', () => {
  let component: MenumstComponent;
  let fixture: ComponentFixture<MenumstComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenumstComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MenumstComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
