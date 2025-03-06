import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChannelwiseViewMailComponent } from './channelwise-view-mail.component';

describe('ChannelwiseViewMailComponent', () => {
  let component: ChannelwiseViewMailComponent;
  let fixture: ComponentFixture<ChannelwiseViewMailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChannelwiseViewMailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChannelwiseViewMailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
