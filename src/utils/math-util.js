/**
 * @module math-util
 */

/**
 * Calculates the sum of an array of numbers
 * @param {number[]} nums 
 * @returns {number} sum
 */
const calculateSum = (nums) => {
    return nums.reduce((sum, num) => sum + num, 0);
};

export { calculateSum };