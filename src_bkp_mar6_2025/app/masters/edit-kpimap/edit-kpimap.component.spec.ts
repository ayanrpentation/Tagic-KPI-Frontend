import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditKpimapComponent } from './edit-kpimap.component';

describe('EditKpimapComponent', () => {
  let component: EditKpimapComponent;
  let fixture: ComponentFixture<EditKpimapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditKpimapComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditKpimapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
