/**
 * 
 * @module parse-util 
 */

/**
 * Parses a deliminated string into tokens
 * @param {string} input string to be parsed
 * @returns {string[]} returns an array of string tokens
 * @throws {Error} Maximum 2 numbers accepted, if exceeded will throw error
 */
const parseIntoTokens = (input) => {
    const tokens = input.split(',');
    if(tokens.length > 2) {
        throw new Error("Cannot exceed the maximum of 2 numbers");
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
 * Converts a string token into a number
 * Valid numbers are negative and positive integers
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