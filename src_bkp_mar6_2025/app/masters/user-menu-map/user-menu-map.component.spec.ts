import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserMenuMapComponent } from './user-menu-map.component';

describe('UserMenuMapComponent', () => {
  let component: UserMenuMapComponent;
  let fixture: ComponentFixture<UserMenuMapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserMenuMapComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserMenuMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
