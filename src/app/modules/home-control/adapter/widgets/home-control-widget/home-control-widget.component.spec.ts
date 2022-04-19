import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeControlWidgetComponent } from './home-control-widget.component';

describe('HomeControlWidgetComponent', () => {
  let component: HomeControlWidgetComponent;
  let fixture: ComponentFixture<HomeControlWidgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeControlWidgetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeControlWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
