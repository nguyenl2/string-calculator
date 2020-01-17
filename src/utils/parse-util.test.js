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
    describe('non-custom strings', () => {
        const NON_CUSTOM_STR_TEST_CASES = [
            ['1,2,3,4,5', [1,2,3,4,5]],
            ['1\n2\n3\n4\n5', [1,2,3,4,5]],
            ['1\n2,3', [1,2,3]]
        ];
        for(const [input, output] of NON_CUSTOM_STR_TEST_CASES) {
            test(`parseStringToNums - input: ${input} ; expected output: ${output}`, () => {
                expect(parseStringToNums(input)).toEqual(output);;
            });
        }
    });
    describe('single character custom deliminated string', () => {
        const SINGLE_CHAR_CUSTOM_STR_TEST_CASES = [
            ['//#\n2#5', [2,5]],
            ['//,\n1*2*3', [0]],
            ['//\n\n1\n2\n3', [1,2,3]],
            ['//**\n1**2', [0,0]],
            ['//\n12', [0,12]]
        ];
        for(const [input, output] of SINGLE_CHAR_CUSTOM_STR_TEST_CASES) {
            test(`parseStringToNums - input: ${input} ; expected output: ${output}`, () => {
                expect(parseStringToNums(input)).toEqual(output);;
            });
        }
    });
    describe('multicharacter custom delimiter', () => {
        const MULTI_CHAR_CUSTOM_STR_TEST_CASES = [
            ['//[***]\n11***22***33', [11,22,33]],
            ['//[[]]\n11[]22[]33', [11,22,33]],
            ['//[\n]\n11\n22\n33', [11,22,33]],
            ['//[]\n123', [123]],
            ['//[][\n123', [0,123]]
        ];
        for(const [input, output] of MULTI_CHAR_CUSTOM_STR_TEST_CASES) {
            test(`parseStringToNums - input: ${input} ; expected output: ${output}`, () => {
                expect(parseStringToNums(input)).toEqual(output);;
            });
        }
    });
    describe('multiple custom delimiters', () => {
        const MULTI_DELIMITER_CUSTOM_STR_TEST_CASES = [
            ['//[*][!!][r9r]\n11r9r22*hh*33!!44', [11,22,0,33,44]],
            ['//[[][]]\n1[2]3', [1,2,3]],
            ['//[[[][]]]\n1[[2]]3', [1,2,3]],
            ['//[*][\n]\n1*2\n3', [1,2,3]],
            ['//[]*[]\n1]*[2]*[3', [1,2,3]],
            ['//[][][]\n123', [123]],
            ['//[][][][\n123', [0,123]]
        ];
        for(const [input, output] of MULTI_DELIMITER_CUSTOM_STR_TEST_CASES) {
            test(`parseStringToNums - input: ${input} ; expected output: ${output}`, () => {
                expect(parseStringToNums(input)).toEqual(output);;
            });
        }
    });
});


