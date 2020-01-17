/**
 * @module math-util
 */

/**
 * Calculates the sum of an array of numbers and displays the formula used to calculate the result
 * @param {number[]} nums 
 * @returns {string} sum formula
 */
const calculateSum = (nums) => {
    return nums.reduce((sum, num) => sum + num, 0);
};

/**
 * Generates the formula used to calculate the sum of an array of numbers
 * @param {*} nums nums array
 * @returns {string} formula
 */
const generateFormula = (nums) => {
    let formula = nums.map((num) => `(${num})`).join(' + ');
    return formula + ' = ' + calculateSum(nums);
};

export { calculateSum, generateFormula };