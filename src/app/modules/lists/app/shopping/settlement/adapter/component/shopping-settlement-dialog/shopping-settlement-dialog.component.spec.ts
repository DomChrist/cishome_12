import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShoppingSettlementDialogComponent } from './shopping-settlement-dialog.component';

describe('ShoppingSettlementDialogComponent', () => {
  let component: ShoppingSettlementDialogComponent;
  let fixture: ComponentFixture<ShoppingSettlementDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShoppingSettlementDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShoppingSettlementDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
