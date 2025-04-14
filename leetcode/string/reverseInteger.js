// Given a signed 32-bit integer x, return x with its digits reversed. If reversing x causes the value to go outside the signed 32-bit integer range [-231, 231 - 1], then return 0.

// Assume the environment does not allow you to store 64-bit integers (signed or unsigned).

// Example 1:

// Input: x = 123
// Output: 321
// Example 2:

// Input: x = -123
// Output: -321
// Example 3:

// Input: x = 120
// Output: 21

// Constraints:

// -231 <= x <= 231 - 1

/**
 * @param {number} x
 * @return {number}
 */
var reverse = function (s) {
  let stack = 1;
  if (s < 0) stack = -1;
  s = s
    .toString()
    .split("")
    .filter((e) => !isNaN(Number(e)));

  // Two-pointer technique
  let left = 0;
  let right = s.length - 1;

  // Swap characters from both ends moving towards the center
  while (left < right) {
    // Destructuring swap
    [s[left], s[right]] = [s[right], s[left]];

    // Move pointers
    left++;
    right--;
  }

  // Join back to string
  let rlt = Number(s.join("")) * stack;
  if (rlt < -(2 ** 31) || rlt > 2 ** 31 - 1) return 0;
  return rlt;
};
