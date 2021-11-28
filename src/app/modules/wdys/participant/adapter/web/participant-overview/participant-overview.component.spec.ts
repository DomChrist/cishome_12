import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParticipantOverviewComponent } from './participant-overview.component';

describe('ParticipantOverviewComponent', () => {
  let component: ParticipantOverviewComponent;
  let fixture: ComponentFixture<ParticipantOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParticipantOverviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ParticipantOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
