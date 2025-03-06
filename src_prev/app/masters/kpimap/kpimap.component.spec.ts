import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KpimapComponent } from './kpimap.component';

describe('KpimapComponent', () => {
  let component: KpimapComponent;
  let fixture: ComponentFixture<KpimapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KpimapComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KpimapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
