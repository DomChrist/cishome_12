import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeteiltComponent } from './geteilt.component';

describe('GeteiltComponent', () => {
  let component: GeteiltComponent;
  let fixture: ComponentFixture<GeteiltComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GeteiltComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GeteiltComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
