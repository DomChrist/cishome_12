import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShoppingItemListViewComponent } from './shopping-item-list-view.component';

describe('ShoppingItemListViewComponent', () => {
  let component: ShoppingItemListViewComponent;
  let fixture: ComponentFixture<ShoppingItemListViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShoppingItemListViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShoppingItemListViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
