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
