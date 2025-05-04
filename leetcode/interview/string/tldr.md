# String Problem Solutions

This directory contains solutions to various string manipulation problems from LeetCode. Below you'll find details about each problem, the approach used to solve it, and an explanation of the solution.

## Problems Overview

1. [First Unique Character](#first-unique-character-in-a-string)
2. [Valid Anagram](#valid-anagram)
3. [Valid Palindrome](#valid-palindrome)
4. [Reverse Integer](#reverse-integer)
5. [Reverse String](#reverse-string)
6. [String to Integer (atoi)](#string-to-integer-atoi)
7. [Implement strStr()](#implement-strstr)

## Approaching String Problems: A Mentor's Guide

When approaching string problems, remember to:

1. **Clarify the requirements** - Understand what the problem is asking
2. **Consider edge cases** - Empty strings, single characters, special cases
3. **Choose the right technique**:
   - Character-by-character processing
   - Two-pointer approach
   - Hash maps/frequency counting
   - Sliding window
   - Dynamic programming (for complex problems)

## First Unique Character in a String

**Problem**: Given a string, find the first non-repeating character and return its index. If it doesn't exist, return -1.

**Example**:

- Input: `"leetcode"` → Output: `0` (The character 'l' is the first unique character)
- Input: `"loveleetcode"` → Output: `2` (The character 'v' is the first unique character)
- Input: `"aabb"` → Output: `-1` (No unique characters)

**Approach**:

1. Count the frequency of each character using a hash map
2. Iterate through the string again to find the first character with frequency 1

**Solution**:

```javascript
var firstUniqChar = function (s) {
  const charMap = new Map();

  for (const char of s) {
    charMap.set(char, (charMap.get(char) || 0) + 1);
  }

  for (let i = 0; i < s.length; i++) {
    if (charMap.get(s[i]) === 1) {
      return i;
    }
  }

  return -1;
};
```

**Complexity**:

- Time: O(n) - We iterate through the string twice
- Space: O(k) - Where k is the number of distinct characters (at most 26 for lowercase English letters)

## Valid Anagram

**Problem**: Given two strings s and t, determine if t is an anagram of s.

**Example**:

- Input: `s = "anagram", t = "nagaram"` → Output: `true`
- Input: `s = "rat", t = "car"` → Output: `false`

**Approach**:

1. Count character frequencies in both strings
2. Compare the frequencies

**Solution**:

```javascript
var isAnagram = function (s, t) {
  if (s.length !== t.length) return false;

  const charMap = new Map();

  // Count characters in s
  for (const char of s) {
    charMap.set(char, (charMap.get(char) || 0) + 1);
  }

  // Decrement count for characters in t
  for (const char of t) {
    if (!charMap.has(char) || charMap.get(char) === 0) return false;
    charMap.set(char, charMap.get(char) - 1);
  }

  return true;
};
```

**Complexity**:

- Time: O(n) - We iterate through both strings once
- Space: O(k) - Storage for character counts

## Valid Palindrome

**Problem**: Determine if a string is a palindrome, considering only alphanumeric characters and ignoring case.

**Example**:

- Input: `"A man, a plan, a canal: Panama"` → Output: `true`
- Input: `"race a car"` → Output: `false`

**Approach**:

1. Use two pointers, starting from both ends of the string
2. Skip non-alphanumeric characters
3. Compare characters (case-insensitive)

**Solution**:

```javascript
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

function isAlphanumeric(char) {
  return (char >= "a" && char <= "z") || (char >= "0" && char <= "9");
}
```

**Complexity**:

- Time: O(n) - We traverse the string once
- Space: O(1) - Constant extra space

## Reverse Integer

**Problem**: Given a signed 32-bit integer, reverse the digits.

**Example**:

- Input: `123` → Output: `321`
- Input: `-123` → Output: `-321`
- Input: `120` → Output: `21`

**Approach**:

1. Convert to string, reverse, then back to integer
2. Handle negative numbers separately
3. Check for 32-bit integer overflow

**Solution**:

```javascript
var reverse = function (x) {
  const isNegative = x < 0;
  const absValue = Math.abs(x);

  const reversed = parseInt(absValue.toString().split("").reverse().join(""));

  // Check for overflow
  if (reversed > 2 ** 31 - 1) return 0;

  return isNegative ? -reversed : reversed;
};
```

**Complexity**:

- Time: O(log n) - Number of digits in the integer
- Space: O(log n) - For the string representation

## Reverse String

**Problem**: Write a function that reverses a string in-place.

**Example**:

- Input: `["h","e","l","l","o"]` → Output: `["o","l","l","e","h"]`
- Input: `["H","a","n","n","a","h"]` → Output: `["h","a","n","n","a","H"]`

**Approach**:

1. Use two pointers to swap characters from both ends

**Solution**:

```javascript
var reverseString = function (s) {
  let left = 0;
  let right = s.length - 1;

  while (left < right) {
    // Swap characters
    [s[left], s[right]] = [s[right], s[left]];

    left++;
    right--;
  }

  // The array is modified in-place
};
```

**Complexity**:

- Time: O(n) - We process each character once
- Space: O(1) - In-place modification

## String to Integer (atoi)

**Problem**: Implement the `atoi` function which converts a string to an integer.

**Rules**:

1. Discard whitespace until the first non-whitespace character
2. Take an optional plus or minus sign
3. Take digits until a non-digit character
4. Clamp to the 32-bit signed integer range

**Example**:

- Input: `"42"` → Output: `42`
- Input: `"   -42"` → Output: `-42`
- Input: `"4193 with words"` → Output: `4193`

**Approach**:

1. Process string character by character
2. Handle whitespace, sign, and digits
3. Check for integer overflow/underflow

**Solution**:

```javascript
var myAtoi = function (s) {
  const INT_MIN = -Math.pow(2, 31);
  const INT_MAX = Math.pow(2, 31) - 1;

  let i = 0;
  let sign = 1;
  let result = 0;

  // Skip whitespace
  while (i < s.length && s[i] === " ") {
    i++;
  }

  // Handle sign
  if (i < s.length && (s[i] === "+" || s[i] === "-")) {
    sign = s[i] === "-" ? -1 : 1;
    i++;
  }

  // Process digits
  while (i < s.length && s[i] >= "0" && s[i] <= "9") {
    // Check for overflow
    if (
      result > Math.floor(INT_MAX / 10) ||
      (result === Math.floor(INT_MAX / 10) && s[i] > "7")
    ) {
      return sign === 1 ? INT_MAX : INT_MIN;
    }

    result = result * 10 + (s[i] - "0");
    i++;
  }

  return result * sign;
};
```

**Complexity**:

- Time: O(n) - We process each character at most once
- Space: O(1) - Constant extra space

## Implement strStr()

**Problem**: Implement strStr(). Find the first occurrence of the needle string in the haystack string, or return -1 if needle is not part of haystack.

**Example**:

- Input: `haystack = "sadbutsad", needle = "sad"` → Output: `0` (The first occurrence is at index 0)
- Input: `haystack = "hello", needle = "ll"` → Output: `2` (The first occurrence is at index 2)
- Input: `haystack = "leetcode", needle = "leeto"` → Output: `-1` (No occurrence found)

**Approach**:

1. Use a **sliding window** approach with two pointers
2. Track the current position in the haystack and the number of matched characters in the needle
3. When characters match, advance both pointers
4. When there's a mismatch, reset the needle index and move haystack index to the next character after the match start

**Solution**:

```javascript
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
```

**Complexity**:

- Time: O(n \* m) - In worst case, for each position in haystack (n), we might need to check up to m characters
- Space: O(1) - Constant extra space regardless of input size

## General String Problem Strategies

- **Hash Maps**: Great for character frequency problems
- **Two Pointers**: Excellent for palindrome, reversal problems
- **ASCII vs. Unicode**: Be aware of character encoding
- **Edge Cases**: Empty strings, single characters, special chars
- **Time Complexity**: Most string operations should aim for O(n) time

Remember to practice these problems with different inputs to strengthen your understanding!

## Find longest common prefix

**Problem**: Implement find longest common prefix between strings in an array.

**Example**:

- Input: strs = `["flower","flow","flight"]` → Output: `fl`
- Input: strs = `["dog","racecar","car"]` → Output: "" → Means there is no common prefix among the input strings.
- Input: 

**Approach**:
- Nhìn vào string[] thì đầu tiên mình nghĩ tới Sliding window kết hợp với DP => tìm common trong 1 cặp
- **DP**: Sử dụng sliding bằng index của string có lenght ngắn nhất, sau đó += prefix theo từng char per index

**Solution**:

```javascript
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
```

**Complexity**:


- Time: O(S) - Where S is the total sum of all characters in all strings.
- Space: O(1) - Constant extra space regardless of input size
