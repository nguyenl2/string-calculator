import { parseIntoTokens, convertToNum, parseStringToNums } from './parse-util';

describe('parseIntoTokens', () => {
    const PARSE_INTO_TOKENS_TEST_CASES = [
        ['20', ['20']],
        ['1,5000', ['1', '5000']],
        ['', ['']],
        [',', ['','']],
        ['1,', ['1','']],
        ['1,tytyt', ['1','tytyt']]
    ];
    
    for(const [input, output] of PARSE_INTO_TOKENS_TEST_CASES) {
        test(`parseIntoTokens - input: ${input} ; expected output: ${output}`, () => {
            expect(parseIntoTokens(input)).toEqual(output);;
        });
    }
});

describe('convertToNum', () => {
    const CONVERT_TO_NUM_TEST_CASES = [
        ['20', 20],
        ['5000', 5000],
        ['-3', -3],
        ['tytyt', 0],
        ['1e5', 0],
        ['3.14', 0],
        ['0xFF', 0],
        ['123abc', 0],
        ['abc123', 0]
    ];
    
    for(const [input, output] of CONVERT_TO_NUM_TEST_CASES) {
        test(`convertToNum - input: ${input} ; expected output: ${output}`, () => {
            expect(convertToNum(input)).toBe(output);;
        });
    }
});


describe('parseStringToNums', () => {
    test('parseStringToNums - parse "1,2,3,4,5" into an array of numbers', () => {
        expect(parseStringToNums('1,2,3,4,5')).toEqual([1,2,3,4,5]);
    });
});


