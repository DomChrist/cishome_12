import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShoppingAddItemViewComponent } from './shopping-add-item-view.component';

describe('ShoppingAddItemViewComponent', () => {
  let component: ShoppingAddItemViewComponent;
  let fixture: ComponentFixture<ShoppingAddItemViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShoppingAddItemViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShoppingAddItemViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
