import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoogleTokenHandlerComponent } from './google-token-handler.component';

describe('GoogleTokenHandlerComponent', () => {
  let component: GoogleTokenHandlerComponent;
  let fixture: ComponentFixture<GoogleTokenHandlerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GoogleTokenHandlerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GoogleTokenHandlerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
