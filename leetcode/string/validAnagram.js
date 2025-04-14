// Given two strings s and t, return true if t is an anagram of s, and false otherwise.

// Example 1:

// Input: s = "anagram", t = "nagaram"

// Output: true

// Example 2:

// Input: s = "rat", t = "car"

// Output: false

// Constraints:

// 1 <= s.length, t.length <= 5 * 104
// s and t consist of lowercase English letters.

// Follow up: What if the inputs contain Unicode characters? How would you adapt your solution to such a case?

/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */

const mapping = (str) => {
  const charMap = new Map();
  for (const char of str) {
    charMap.set(char, (charMap.get(char) || 0) + 1);
  }

  return charMap;
};

var isAnagram = function (s, t) {
  const parseS = mapping(s);
  const parseT = mapping(t);
  if (parseS.size !== parseT.size) return false;
  const rlt = Array.from(mapping(s).entries()).every(([k, _]) => {
    const pickedVal = parseT.get(k);
    if (pickedVal === undefined || parseS.get(k) !== parseT.get(k))
      return false;
    return true;
  });

  return rlt;
};
