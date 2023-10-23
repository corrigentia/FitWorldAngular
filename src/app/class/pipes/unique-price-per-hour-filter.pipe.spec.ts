import { UniquePricePerHourFilterPipe } from './unique-price-per-hour-filter.pipe';

describe('UniquePricePerHourFilterPipe', () => {
  it('create an instance', () => {
    const pipe = new UniquePricePerHourFilterPipe();
    expect(pipe).toBeTruthy();
  });
});
