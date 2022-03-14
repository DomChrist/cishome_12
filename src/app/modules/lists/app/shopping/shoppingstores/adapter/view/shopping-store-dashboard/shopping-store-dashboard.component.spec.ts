import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShoppingStoreDashboardComponent } from './shopping-store-dashboard.component';

describe('ShoppingStoreDashboardComponent', () => {
  let component: ShoppingStoreDashboardComponent;
  let fixture: ComponentFixture<ShoppingStoreDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShoppingStoreDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShoppingStoreDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
