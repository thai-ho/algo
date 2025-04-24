# Array Problem Solutions

This directory contains solutions to various array manipulation problems from LeetCode. Below you'll find details about each problem, the approach used to solve it, and an explanation of the solution.

## Problems Overview

1. [Contains Duplicate](#contains-duplicate)
2. [Intersection of Two Arrays II](#intersection-of-two-arrays-ii)
3. [Maximum Profit](#maximum-profit)
4. [Move Zeroes](#move-zeroes)
5. [Plus One](#plus-one)
6. [Remove Duplicates](#remove-duplicates)
7. [Rotate Array](#rotate-array)
8. [Rotate Image](#rotate-image)
9. [Single Number](#single-number)
10. [Two Sum](#two-sum)
11. [Valid Sudoku](#valid-sudoku)

## Approaching Array Problems: A Mentor's Guide

When approaching array problems, remember to:

1. **Clarify the requirements** - Understand what the problem is asking
2. **Consider edge cases** - Empty arrays, single elements, duplicates, negative numbers
3. **Choose the right technique**:
   - Brute force vs. optimized solutions
   - Two-pointer approach
   - Hash maps for lookups
   - Sorting when order doesn't matter
   - In-place modifications vs. creating new arrays
   - Sliding window
   - Dynamic programming (for complex problems)

## Contains Duplicate

**Problem**: Given an integer array, determine if any value appears at least twice.

**Example**:

- Input: `[1,2,3,1]` → Output: `true`
- Input: `[1,2,3,4]` → Output: `false`

**Approach**:

1. Use a hash set to track seen numbers
2. Return true as soon as we encounter a number already in the set

**Solution**:

```javascript
var containsDuplicate = function(nums) {
    const seen = new Set();
    
    for (const num of nums) {
        if (seen.has(num)) {
            return true;
        }
        seen.add(num);
    }
    
    return false;
};
```

**Complexity**:

- Time: O(n) - We iterate through the array once
- Space: O(n) - In worst case, we store all elements in the set

## Intersection of Two Arrays II

**Problem**: Given two arrays, find their intersection (elements that appear in both arrays).

**Example**:

- Input: `nums1 = [1,2,2,1], nums2 = [2,2]` → Output: `[2,2]`
- Input: `nums1 = [4,9,5], nums2 = [9,4,9,8,4]` → Output: `[4,9]` (order can be arbitrary)

**Approach**:

1. Use a hash map to count occurrences in the first array
2. Iterate through the second array, checking against the map

**Solution**:

```javascript
var intersect = function(nums1, nums2) {
    const map = new Map();
    const result = [];
    
    // Count occurrences in nums1
    for (const num of nums1) {
        map.set(num, (map.get(num) || 0) + 1);
    }
    
    // Check nums2 against the map
    for (const num of nums2) {
        if (map.has(num) && map.get(num) > 0) {
            result.push(num);
            map.set(num, map.get(num) - 1);
        }
    }
    
    return result;
};
```

**Complexity**:

- Time: O(n + m) - Where n and m are the lengths of the input arrays
- Space: O(min(n, m)) - For storing the counts of the smaller array

## Maximum Profit

**Problem**: Given an array of prices, find the maximum profit by buying on one day and selling on a future day.

**Example**:

- Input: `[7,1,5,3,6,4]` → Output: `5` (Buy on day 2 at price 1, sell on day 5 at price 6)
- Input: `[7,6,4,3,1]` → Output: `0` (No profit possible)

**Approach**:

1. Keep track of the minimum price seen so far
2. For each price, calculate the potential profit and update the maximum

**Solution**:

```javascript
var maxProfit = function(prices) {
    let minPrice = Infinity;
    let maxProfit = 0;
    
    for (const price of prices) {
        if (price < minPrice) {
            minPrice = price;
        } else {
            maxProfit = Math.max(maxProfit, price - minPrice);
        }
    }
    
    return maxProfit;
};
```

**Complexity**:

- Time: O(n) - We iterate through the array once
- Space: O(1) - Constant space used

## Move Zeroes

**Problem**: Move all zeroes to the end of the array while maintaining the relative order of non-zero elements.

**Example**:

- Input: `[0,1,0,3,12]` → Output: `[1,3,12,0,0]`

**Approach**:

1. Use two pointers: one to iterate and one to mark the position for the next non-zero element
2. Swap elements when necessary

**Solution**:

```javascript
var moveZeroes = function(nums) {
    let insertPos = 0;
    
    // Move all non-zero elements to the front
    for (let i = 0; i < nums.length; i++) {
        if (nums[i] !== 0) {
            nums[insertPos] = nums[i];
            insertPos++;
        }
    }
    
    // Fill the rest with zeroes
    while (insertPos < nums.length) {
        nums[insertPos] = 0;
        insertPos++;
    }
};
```

**Complexity**:

- Time: O(n) - We iterate through the array once
- Space: O(1) - In-place modification

## Plus One

**Problem**: Given a non-empty array of decimal digits representing a non-negative integer, increment the integer by one.

**Example**:

- Input: `[1,2,3]` → Output: `[1,2,4]`
- Input: `[4,3,2,1]` → Output: `[4,3,2,2]`
- Input: `[9,9,9]` → Output: `[1,0,0,0]`

**Approach**:

1. Start from the least significant digit (rightmost)
2. Add 1 and handle carrying

**Solution**:

```javascript
var plusOne = function(digits) {
    for (let i = digits.length - 1; i >= 0; i--) {
        digits[i]++;
        
        if (digits[i] < 10) {
            // No carry needed, we're done
            return digits;
        }
        
        // Carry needed, set current digit to 0 and continue
        digits[i] = 0;
    }
    
    // If we get here, we need to add a new digit at the beginning
    digits.unshift(1);
    return digits;
};
```

**Complexity**:

- Time: O(n) - In worst case, we iterate through the entire array
- Space: O(1) - In-place modification (ignoring potential array expansion)

## Remove Duplicates

**Problem**: Remove duplicates from a sorted array in-place and return the new length.

**Example**:

- Input: `[1,1,2]` → Output: `2, nums = [1,2,_]`
- Input: `[0,0,1,1,1,2,2,3,3,4]` → Output: `5, nums = [0,1,2,3,4,_,_,_,_,_]`

**Approach**:

1. Use two pointers: one to iterate and one to keep track of the next unique element position

**Solution**:

```javascript
var removeDuplicates = function(nums) {
    if (nums.length === 0) return 0;
    
    let uniqueIndex = 0;
    
    for (let i = 1; i < nums.length; i++) {
        if (nums[i] !== nums[uniqueIndex]) {
            uniqueIndex++;
            nums[uniqueIndex] = nums[i];
        }
    }
    
    return uniqueIndex + 1; // Length of the new array
};
```

**Complexity**:

- Time: O(n) - We iterate through the array once
- Space: O(1) - In-place modification

## Rotate Array

**Problem**: Rotate an array to the right by k steps.

**Example**:

- Input: `nums = [1,2,3,4,5,6,7], k = 3` → Output: `[5,6,7,1,2,3,4]`
- Input: `nums = [-1,-100,3,99], k = 2` → Output: `[3,99,-1,-100]`

**Approach**:

1. Use the reverse technique: reverse the whole array, then reverse the first k elements and the remaining elements separately

**Solution**:

```javascript
var rotate = function(nums, k) {
    k %= nums.length; // Handle k > nums.length
    
    // Helper function to reverse array segment
    function reverse(start, end) {
        while (start < end) {
            [nums[start], nums[end]] = [nums[end], nums[start]];
            start++;
            end--;
        }
    }
    
    // Reverse the entire array
    reverse(0, nums.length - 1);
    
    // Reverse first k elements
    reverse(0, k - 1);
    
    // Reverse remaining elements
    reverse(k, nums.length - 1);
};
```

**Complexity**:

- Time: O(n) - We reverse the array elements
- Space: O(1) - In-place modification

## Rotate Image

**Problem**: Rotate an n×n 2D matrix (image) 90 degrees clockwise.

**Example**:

- Input: `[[1,2,3],[4,5,6],[7,8,9]]` → Output: `[[7,4,1],[8,5,2],[9,6,3]]`

**Approach**:

1. First transpose the matrix (swap rows and columns)
2. Then reverse each row

**Solution**:

```javascript
var rotate = function(matrix) {
    const n = matrix.length;
    
    // Transpose the matrix
    for (let i = 0; i < n; i++) {
        for (let j = i; j < n; j++) {
            [matrix[i][j], matrix[j][i]] = [matrix[j][i], matrix[i][j]];
        }
    }
    
    // Reverse each row
    for (let i = 0; i < n; i++) {
        matrix[i].reverse();
    }
};
```

**Complexity**:

- Time: O(n²) - We touch each element in the matrix
- Space: O(1) - In-place modification

## Single Number

**Problem**: Given a non-empty array of integers, every element appears twice except for one. Find that single one.

**Example**:

- Input: `[2,2,1]` → Output: `1`
- Input: `[4,1,2,1,2]` → Output: `4`

**Approach**:

1. Use the XOR operation, which cancels out when the same number appears twice

**Solution**:

```javascript
var singleNumber = function(nums) {
    let result = 0;
    
    for (const num of nums) {
        result ^= num;
    }
    
    return result;
};
```

**Complexity**:

- Time: O(n) - We iterate through the array once
- Space: O(1) - Constant space used

## Two Sum

**Problem**: Given an array of integers and a target sum, return indices of two numbers that add up to the target.

**Example**:

- Input: `nums = [2,7,11,15], target = 9` → Output: `[0,1]` (2 + 7 = 9)
- Input: `nums = [3,2,4], target = 6` → Output: `[1,2]` (2 + 4 = 6)

**Approach**:

1. Use a hash map to store visited numbers and their indices
2. For each number, check if its complement (target - num) is in the map

**Solution**:

```javascript
var twoSum = function(nums, target) {
    const map = new Map();
    
    for (let i = 0; i < nums.length; i++) {
        const complement = target - nums[i];
        
        if (map.has(complement)) {
            return [map.get(complement), i];
        }
        
        map.set(nums[i], i);
    }
    
    // No solution found
    return [];
};
```

**Complexity**:

- Time: O(n) - We iterate through the array once
- Space: O(n) - In worst case, we store all elements in the map

## Valid Sudoku

**Problem**: Determine if a 9x9 Sudoku board is valid (each row, column, and 3x3 sub-boxes contain digits 1-9 without repetition).

**Example**:
- Input: A 9x9 grid with some filled cells
- Output: `true` if valid, `false` otherwise

**Approach**:

1. Check each row, column, and 3x3 sub-box for duplicates
2. Use sets to track seen numbers

**Solution**:

```javascript
var isValidSudoku = function(board) {
    // Check rows
    for (let i = 0; i < 9; i++) {
        const rowSet = new Set();
        for (let j = 0; j < 9; j++) {
            if (board[i][j] !== '.') {
                if (rowSet.has(board[i][j])) return false;
                rowSet.add(board[i][j]);
            }
        }
    }
    
    // Check columns
    for (let j = 0; j < 9; j++) {
        const colSet = new Set();
        for (let i = 0; i < 9; i++) {
            if (board[i][j] !== '.') {
                if (colSet.has(board[i][j])) return false;
                colSet.add(board[i][j]);
            }
        }
    }
    
    // Check 3x3 sub-boxes
    for (let boxRow = 0; boxRow < 3; boxRow++) {
        for (let boxCol = 0; boxCol < 3; boxCol++) {
            const boxSet = new Set();
            for (let i = 0; i < 3; i++) {
                for (let j = 0; j < 3; j++) {
                    const cell = board[boxRow * 3 + i][boxCol * 3 + j];
                    if (cell !== '.') {
                        if (boxSet.has(cell)) return false;
                        boxSet.add(cell);
                    }
                }
            }
        }
    }
    
    return true;
};
```

**Complexity**:

- Time: O(1) - The board is always 9x9
- Space: O(1) - We use a constant amount of space

## General Array Problem Strategies

- **Hash Maps/Sets**: Great for lookups, finding duplicates, and pairs
- **Two Pointers**: Useful for in-place operations, sliding windows, and meeting conditions
- **Sorting**: Can simplify problems when order isn't important
- **Divide & Conquer**: Break complex problems into smaller subproblems
- **In-place Modification**: Save space by modifying the original array
- **Prefix Sums**: Helpful for range queries and cumulative operations
- **Binary Search**: For finding elements in sorted arrays

Remember to practice these problems with different inputs to strengthen your understanding!