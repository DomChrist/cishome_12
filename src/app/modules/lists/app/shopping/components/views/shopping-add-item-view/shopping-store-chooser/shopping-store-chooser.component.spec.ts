import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShoppingStoreChooserComponent } from './shopping-store-chooser.component';

describe('ShoppingStoreChooserComponent', () => {
  let component: ShoppingStoreChooserComponent;
  let fixture: ComponentFixture<ShoppingStoreChooserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShoppingStoreChooserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShoppingStoreChooserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
