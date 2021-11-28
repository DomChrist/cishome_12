import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParticipantWidgetComponent } from './participant-widget.component';

describe('ParticipantWidgetComponent', () => {
  let component: ParticipantWidgetComponent;
  let fixture: ComponentFixture<ParticipantWidgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParticipantWidgetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ParticipantWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
