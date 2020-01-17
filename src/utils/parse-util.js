/**  @module parse-util  */

/**
 * Parses a deliminated string into tokens <br/>
 * If a given delimiter is an empty string, it will be ignored
 * @param {string} input string to be parsed
 * @param {string[]} [delimiters=[',','\n']] a set of delimiters used to split the string
 * @returns {string[]} returns an array of string tokens
 */
const parseIntoTokens = (input, delimiters = [',' , '\n']) => {
    let tokens = [input];
    for(const delimiter of delimiters) {
        if(delimiter === '') {
            continue;
        }
        const newTokens = [];
        for(const token of tokens) {
            const parts = token.split(delimiter);
            newTokens.push(...parts);
        }
        tokens = newTokens;
    }
    return tokens;
};

/**
 * Tests whether a character is between 0-9
 * @param {string} c single character
 * @returns {boolean}
 */
const isDigit = (c) => {
    if('0' <= c && c <= '9') {
        return true;
    }
    return false;
};

/**
 * Converts a string token into a number <br/>
 * Valid numbers are positive integers <br/>
 * Invalid numbers such as numbers greater than 1000, empty string, floats, scientific notation, hexadeximal, or containing non-digit characters are converted to 0
 * @param {string} token token string to be converted to a number
 * @param {boolean} [allowNeg=false] are negatives allowed?
 * @param {number} [upperBound=1000] upperBound value, if exceeded converts number to 0
 * @returns {number}
 * @throws {Error} Negative numbers will throw an error
 */
const convertToNum = (token, allowNeg = false, upperBound = 1000) => {
    // if string is empty, convert to 0
    if(token === '') {
        return 0;
    }
    // if negatives are not allowed, and num is negative, throw error
    if(!allowNeg && token[0] === '-') {
        throw new Error('Negative numbers are not allowed');
    }
    // if negatives are allowed, check first char for '-'
    if(allowNeg && token[0] !== '-' && !isDigit(token[0])) {
        return 0;
    }
    // verify the remaining chars are digits
    for(let i = 1; i < token.length; i++) {
        if(!isDigit(token[i])) {
            return 0;
        }
    }
    // convert numbers greater than upper bound to 0
    return Number(token) <= upperBound ? Number(token) : 0;
};


/**
 * @typedef {Object} parsedCustomDelims
 * @property {string[]} delimiters delimiters used to split number string
 * @property {string} numberString number string
 */

/**
 * Takes a custom string in the following formats
 * <ul>
 *      <li>//{delimiter}\n{numbers} where {delimiter} is a single character (and non-empty) and {numbers} is a number string </li>
 *      <li>//[{delimiter}]\n{numbers} where {delimiter} can have multiple characters and {numbers} is a number string <br/>
 *          If the brackets are malformed (like [][), the entire input will be parsed like a non-custom string <br/>
 *          If the delimiter is an empty string, it will be ignored and the number string will not be split <br/>
 *      </li>
 *      <li>//[{delimiter1}][{delimiter2}]...\n{numbers} where {delimiter#} can have multiple characters and {numbers} is a number string <br/>
 *          If the brackets are malformed (like [][), the entire input will be parsed like a non-custom string <br/>
 *          If a delimiter is an empty string, it will be ignored and not used <br/>
 *      </li>
 * </ul>
 * @param {string} input custom string
 * @returns {module:parse-util~parsedCustomDelims} { delimiters, numberString }
 * @throws {Error} if custom string cannot be parsed, an error will be thrown
 */
const parseCustomDelimiters = (input) => {
    let delimiters = [];
    let numberString = '';
    // multicharacter delimiter or multiple delimiters
    if(input[2] === '[') { 
        let endingNewlineIdx;
        for( let i = input.length - 1; i >= 4; i--) { // at a minimum //[]\n, where \n is at index 4
            if(input[i - 1] === ']' && input[i] === '\n') {
                endingNewlineIdx = i;
                break;
            }
        }
        if(endingNewlineIdx) {
            let startDelimIdx = 3;
            for(let i = 3; i < endingNewlineIdx; i++) {
                if(input[i - 1] === ']' && input[i] === '[') {
                    delimiters.push(input.slice(startDelimIdx, i - 1));
                    startDelimIdx = i + 1;
                    continue;
                }
           }
           delimiters.push(input.slice(startDelimIdx, endingNewlineIdx - 1));
           numberString = input.slice(endingNewlineIdx + 1, input.length);
           return { delimiters, numberString };
        }
    } 
    // single character delimiter
    if(input[3] === '\n') { 
        delimiters.push(input[2]);
        numberString = input.slice(4, input.length);
        return { delimiters, numberString };
    } 
    throw new Error('Custom delimited string could not be parsed');
};

/**
 * Takes a string and parses it into an array of numbers <br/>
 * Valid inputs include <br/>
 * <ul>
 * <li> comma and newline deliminated numbers </li> 
 * <li> custom string in the formats 
 *  <ul>
 *      <li>//{delimiter}\n{numbers} where {delimiter} is a single character (and non-empty) and {numbers} is a number string</li>
 *      <li>//[{delimiter}]\n{numbers} where {delimiter} can have multiple characters and {numbers} is a number string</li>
 *      <li>//[{delimiter1}][{delimiter2}]...\n{numbers} where {delimiter#} can have multiple characters and {numbers} is a number string</li>
 *  </ul>
 * </li>
 * </ul>
 * If a custom string is used, the default delimiters ( , and \n or alternate delimiter) will not be used to split the string <br/>
 * @param {string} input input string
 * @param {string} [altDelimiter='\n'] alternative delimiter in addition to the comma
 * @param {boolean} [allowNeg=false] allow negatives
 * @param {number} [upperBound=1000] upper bound number limit
 * @returns {number[]} array of parsed numbers
 */
const parseStringToNums = (input, altDelimiter = '\n', allowNeg = false, upperBound = 1000) => {
    let tokens;
    if(input.startsWith('//')) {
        try {
            const { delimiters, numberString } = parseCustomDelimiters(input);
            tokens = parseIntoTokens(numberString, delimiters);
        } catch(e) {
            tokens = parseIntoTokens(input, [',', altDelimiter]);
        }
    } else {
        tokens = parseIntoTokens(input, [',', altDelimiter]);
    }
    return tokens.map((token) => convertToNum(token, allowNeg, upperBound));
};

export { parseIntoTokens, convertToNum, parseStringToNums };