import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WdysDashboardComponent } from './wdys-dashboard.component';

describe('WdysDashboardComponent', () => {
  let component: WdysDashboardComponent;
  let fixture: ComponentFixture<WdysDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WdysDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WdysDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
