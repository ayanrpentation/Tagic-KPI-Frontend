import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RuleReplicationComponent } from './rule-replication.component';

describe('RuleReplicationComponent', () => {
  let component: RuleReplicationComponent;
  let fixture: ComponentFixture<RuleReplicationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RuleReplicationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RuleReplicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
