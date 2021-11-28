import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchParticipantComponent } from './search-participant.component';

describe('SearchParticipantComponent', () => {
  let component: SearchParticipantComponent;
  let fixture: ComponentFixture<SearchParticipantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchParticipantComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchParticipantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
