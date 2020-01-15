import { calculateSum } from './math-util';

test('calculateSum - adding 1,2,3', () => {
    expect(calculateSum([1,2,3])).toBe(6);
});