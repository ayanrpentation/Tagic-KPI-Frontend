import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuditfilenewComponent } from './auditfilenew.component';

describe('AuditfilenewComponent', () => {
  let component: AuditfilenewComponent;
  let fixture: ComponentFixture<AuditfilenewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuditfilenewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuditfilenewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
