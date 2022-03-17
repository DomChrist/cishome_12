import { ShoppingListPipe } from './shopping-list.pipe';

describe('ShoppingListPipe', () => {
  it('create an instance', () => {
    const pipe = new ShoppingListPipe();
    expect(pipe).toBeTruthy();
  });
});
