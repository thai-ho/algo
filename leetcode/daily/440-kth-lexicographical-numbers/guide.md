## Pattern

**Problem**:
Given two integers n and k, return the kth lexicographically smallest integer in the range [1, n].

**Example**:

- Example 1:

Input: n = 13, k = 2
Output: 10
Explanation: The lexicographical order is [1, 10, 11, 12, 13, 2, 3, 4, 5, 6, 7, 8, 9], so the second smallest number is 10.

- Example 2:

Input: n = 1, k = 1
Output: 1

**Approach**:
Nhiều cách nhưng về performance sẽ hạn chế số cách làm đơn giản, ví dụ như brute force, hoặc khởi tạo Array mới và sort theo k

**Solution**:

```javascript
/**
 * @param {number} n
 * @param {number} k
 * @return {number}
 */
var findKthNumber = function (n, k) {
  let current = 1;
  k--; // Convert to 0-indexed

  while (k > 0) {
    // Đếm số lượng numbers trong subtree có prefix = current
    const count = countNumbers(current, n);

    if (k >= count) {
      // Skip entire subtree, move to next sibling
      k -= count;
      current++;
    } else {
      // Target nằm trong subtree này, đi sâu hơn
      k--;
      current *= 10;
    }
  }

  return current;
};

/**
 * Đếm số lượng numbers có prefix từ first đến n
 * @param {number} first - prefix hiện tại
 * @param {number} n - giới hạn trên
 * @return {number} - số lượng numbers
 */
function countNumbers(first, n) {
  let count = 0;
  let current = first;
  let next = first + 1;

  while (current <= n) {
    // Đếm numbers trong range [current, min(next-1, n)]
    count += Math.min(next - 1, n) - current + 1;

    // Move to next level
    current *= 10;
    next *= 10;
  }

  return count;
}

// Test cases
function test() {
  console.log("Test n=13, k=2:", findKthNumber(13, 2)); // Expected: 10
  console.log("Test n=1, k=1:", findKthNumber(1, 1)); // Expected: 1
  console.log("Test n=100, k=10:", findKthNumber(100, 10)); // Expected: 17
}

test();
```

**Complexity**:

- **Time**: O(log₁₀(n)²)

The outer `while` loop in `findKthNumber` runs at most O(log₁₀(n)) times because:

- We either move to the next sibling (`current++`) or go deeper (`current *= 10`)
- The maximum depth is the number of digits in n, which is log₁₀(n)
- We can move sideways at most 9 times per level (digits 1-9)

The `countNumbers` function also runs O(log₁₀(n)) times:

- It iterates through each level of the tree (from 1-digit to d-digit numbers)
- Each iteration multiplies `current` and `next` by 10

Since `countNumbers` is called in each iteration of the main loop: O(log₁₀(n)) × O(log₁₀(n)) = O(log₁₀(n)²)

- **Space**: O(1)

- Only using a constant amount of extra space for variables
- No recursion or additional data structures needed

**Why this is efficient**:

- Avoids generating all numbers and sorting them: O(n log n)
- Avoids generating the first k numbers: O(k)
- Uses the lexicographical tree structure to skip entire subtrees when possible
- For large inputs where n = 10⁹, this approach runs in ~30 operations vs 10⁹ operations for brute force
