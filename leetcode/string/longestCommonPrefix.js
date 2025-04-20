const findCommonPrefix = (str1, str2) => {
  let prefix = "";

  // Compare characters at the same position
  for (let i = 0; i < Math.min(str1.length, str2.length); i++) {
    if (str1[i] === str2[i]) {
      prefix += str1[i];
    } else {
      // Stop when we hit a mismatch
      break;
    }
  }

  return prefix;
};

/**
 * @param {string[]} strs
 * @return {string}
 */

var longestCommonPrefix = function (strs) {
  if (strs.length === 0) return "";
  if (strs.length === 1) return strs[0];

  // Start with the first string as our initial prefix
  let prefix = strs[0];

  // Compare with each remaining string
  for (let i = 1; i < strs.length; i++) {
    prefix = findCommonPrefix(prefix, strs[i]);

    // If at any point we have no common prefix, we can stop
    if (prefix === "") break;
  }

  return prefix;
};

console.log(longestCommonPrefix(["flower", "cflow"]));
