import { calculateSum, generateFormula } from './math-util';

test('calculateSum - adding 1,2,3', () => {
    expect(calculateSum([1,2,3])).toBe(6);
});

test('generateFormula - formula for sum of 1,2,3', () => {
    expect(generateFormula([1,2,3])).toBe('(1) + (2) + (3) = 6');;
});

test('generateFormula - formula for sum of -1,-2,-3', () => {
    expect(generateFormula([-1,-2,-3])).toBe('(-1) + (-2) + (-3) = -6');;
});