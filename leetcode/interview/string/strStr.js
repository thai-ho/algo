/**
 * @param {string} haystack
 * @param {string} needle
 * @return {number}
 */
var strStr = function (haystack, needle) {
  // Edge case: empty needle
  if (needle.length === 0) return 0;

  let haystackIndex = 0; // Current position in haystack
  let needleIndex = 0; // How many characters of needle have been matched
  let matchStartIndex = 0; // Start position of current potential match

  while (haystackIndex < haystack.length) {
    if (haystack[haystackIndex] === needle[needleIndex]) {
      // Characters match, continue matching sequence
      needleIndex++;
      haystackIndex++;
    } else {
      // Mismatch found, move to next position after match start
      haystackIndex = matchStartIndex + 1;
      needleIndex = 0;
      matchStartIndex = haystackIndex;
    }

    // If we've matched all characters in needle
    if (needleIndex === needle.length) {
      return matchStartIndex;
    }
  }

  // Needle not found
  return -1;
};

console.log(strStr("sadbutsad", "sad"));
console.log("=========================");
console.log(strStr("hello", "ll"));
console.log("=========================");
console.log(strStr("leetcode", "leeto"));
console.log("=========================");
console.log(strStr("mississippi", "issip"));

// most accepted solutions memory distribution
// var strStr = function(haystack, needle) {
//   return haystack.indexOf(needle);
// };
