/**  @module parse-util  */

/**
 * Parses a deliminated string into tokens <br/>
 * @param {string} input string to be parsed
 * @param {string[]} [delimiters=[',','\n']] a set of delimiters used to split the string
 * @returns {string[]} returns an array of string tokens
 */
const parseIntoTokens = (input, delimiters = [',' , '\n']) => {
    let tokens = [input];
    for(const delimiter of delimiters) {
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
 * @returns {number}
 * @throws {Error} Negative numbers will throw an error
 */
const convertToNum = (token) => {
    // if string is empty, convert to 0
    if(token === "") {
        return 0;
    }
    // if negative, throw error
    if(token[0] === '-') {
        throw new Error("Negative numbers are not allowed");
    }
    // verify the remaining chars are digits
    for(let i = 0; i < token.length; i++) {
        if(!isDigit(token[i])) {
            return 0;
        }
    }
    // convert numbers greater than 1000 to 0
    return Number(token) <= 1000 ? Number(token) : 0;
};


/**
 * @typedef {Object} parsedCustomDelim
 * @property {string} delimiter delimiter use to split number string
 * @property {string} numberString number string
 */

/**
 * Takes a custom string in the format //{delimiter}\n{numbers} and parses out the delimiter and number string separately
 * @param {string} input custom string
 * @returns {module:parse-util~parsedCustomDelim} { delimiter, numberString }
 */
const parseCustomDelimiter = (input) => {
    const delimiter = [input[2]];
    const numberString = input.slice(4, input.length);
    return { delimiter, numberString };
};

/**
 * Takes a string and parses it into an array of numbers <br/>
 * Valid inputs include <br/>
 * <ul>
 * <li> comma and newline deliminated numbers </li> 
 * <li> custom string in the format //{delimiter}\n{numbers} where {delimiter} is a single character and {numbers} is a number string</li>
 * </ul>
 * If a custom string is used, the default delimiters (, and \n) will not be used to split the string
 * @param {string} input input string
 * @returns {number[]} array of parsed numbers
 */
const parseStringToNums = (input) => {
    if(input.startsWith('//') & input[3] === '\n') {
        const { delimiter, numberString } = parseCustomDelimiter(input);
        return parseIntoTokens(numberString, delimiter).map((token) => convertToNum(token));
    }
    return parseIntoTokens(input).map((token) => convertToNum(token));
};

export { parseIntoTokens, convertToNum, parseStringToNums };