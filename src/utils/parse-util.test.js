import { parseIntoTokens, convertToNum, parseStringToNums } from './parse-util';

describe('parseIntoTokens', () => {
    const PARSE_INTO_TOKENS_TEST_CASES = [
        ['20', ['20']],
        ['1,5000', ['1', '5000']],
        ['', ['']],
        [',', ['','']],
        ['1,', ['1','']],
        ['1,tytyt', ['1','tytyt']],
        ['1\n1', ['1','1']],
        ['1\n2,3', ['1','2','3']]
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
        ['1000', 1000],
        ['1001', 0],
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

    test('convertToNum - negative number input should throw error', () => {
        expect(() => {convertToNum('-1')}).toThrow(Error);
    });
});


describe('parseStringToNums', () => {
    test('parseStringToNums - parse "1,2,3,4,5" into an array of numbers', () => {
        expect(parseStringToNums('1,2,3,4,5')).toEqual([1,2,3,4,5]);
    });
    test('parseStringToNums - parse "1\n2\n3\n4\n5" into an array of numbers', () => {
        expect(parseStringToNums('1\n2\n3\n4\n5')).toEqual([1,2,3,4,5]);
    });
    describe('single character custom delimiter', () => {
        test('parseStringToNums - parse "//#\n2#5" into an array of numbers', () => {
            expect(parseStringToNums('//#\n2#5')).toEqual([2,5]);
        });
        test('parseStringToNums - parse "//,\n1*2*3" into 0', () => {
            expect(parseStringToNums('//,\n1*2*3')).toEqual([0]);
        });
        test('parseStringToNums - parse "//\n\n1\n2\n3" into an array of numbers', () => {
            expect(parseStringToNums('//\n\n1\n2\n3')).toEqual([1,2,3]);
        });
        test('parseStringToNums - parse "//**\n1**2" like a regular non-custom string', () => {
            expect(parseStringToNums('//**\n1**2')).toEqual([0,0]);
        });
    });
});


