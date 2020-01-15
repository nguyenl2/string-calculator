/**  @module parse-util  */

/**
 * @constant {string[]}
 * @default
 */
 const DELIMITERS = [',', '\n'];

/**
 * Parses a deliminated string into tokens <br/>
 * Supported delimiters are enumerated in {@link module:parse-util~DELIMITERS|DELIMITERS}
 * @param {string} input string to be parsed
 * @returns {string[]} returns an array of string tokens
 */
const parseIntoTokens = (input) => {
    let tokens = [input];
    for(const delimiter of DELIMITERS) {
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
 * Valid numbers are negative and positive integers <br/>
 * Invalid numbers such as empty string, floats, scientific notation, hexadeximal, or containing non-digit characters are converted to 0
 * @param {string} token token string to be converted to a number
 * @returns {number}
 */
const convertToNum = (token) => {
    // if string is empty, convert to 0
    if(token === "") {
        return 0;
    }
    // if first char is neither a minus sign or digit, it's invalid and convert to 0
    if(token[0] !== '-' && !isDigit(token[0])) {
        return 0;
    }
    // verify the remaining chars are digits
    for(let i = 1; i < token.length; i++) {
        if(!isDigit(token[i])) {
            return 0;
        }
    }
    return Number(token);
};

/**
 * Takes a deliminated input string and parses it into an array of numbers
 * @param {string} input 
 * @returns {number[]}
 */
const parseStringToNums = (input) => {
    return parseIntoTokens(input).map((token) => convertToNum(token));
};

export { parseIntoTokens, convertToNum, parseStringToNums };