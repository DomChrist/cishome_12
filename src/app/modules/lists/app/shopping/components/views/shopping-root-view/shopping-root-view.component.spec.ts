import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShoppingRootViewComponent } from './shopping-root-view.component';

describe('ShoppingRootViewComponent', () => {
  let component: ShoppingRootViewComponent;
  let fixture: ComponentFixture<ShoppingRootViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShoppingRootViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShoppingRootViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
