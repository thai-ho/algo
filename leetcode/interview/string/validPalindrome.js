// A phrase is a palindrome if, after converting all uppercase letters into lowercase letters and removing all non-alphanumeric characters, it reads the same forward and backward. Alphanumeric characters include letters and numbers.

// Given a string s, return true if it is a palindrome, or false otherwise.

// Example 1:

// Input: s = "A man, a plan, a canal: Panama"
// Output: true
// Explanation: "amanaplanacanalpanama" is a palindrome.
// Example 2:

// Input: s = "race a car"
// Output: false
// Explanation: "raceacar" is not a palindrome.
// Example 3:

// Input: s = " "
// Output: true
// Explanation: s is an empty string "" after removing non-alphanumeric characters.
// Since an empty string reads the same forward and backward, it is a palindrome.

// Constraints:

// 1 <= s.length <= 2 * 105
// s consists only of printable ASCII characters.

/**
 * @param {string} s
 * @return {boolean}
 */
var isPalindrome = function (s) {
  let str = s.split(" ").join("");

  var lower = str.toLowerCase();
  var upper = str.toUpperCase();

  var res = "";
  for (var i = 0; i < lower.length; ++i) {
    const character = lower[i];
    if (
      character != upper[i] ||
      character.trim() === "" ||
      !isNaN(Number(character))
    ) {
      res += character;
    }
  }

  for (let i = 0; i < res.length; i++) {
    if (res[i] !== res[res.length - i - 1]) {
      return false;
    }
  }

  return true;
};
