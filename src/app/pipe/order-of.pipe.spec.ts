import { OrderOfPipe } from './order-of.pipe';

describe('OrderOfPipe', () => {
  it('create an instance', () => {
    const pipe = new OrderOfPipe();
    expect(pipe).toBeTruthy();
  });
});
