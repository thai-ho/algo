/**
 * @param {number} n
 * @param {number} k
 * @return {number}
 */
var findKthNumber = function (n, k) {
  // Cách 1: Brute force - Generate all numbers rồi sort
  const arr = [];
  for (let i = 1; i <= n; i++) {
    arr.push(i);
  }
  arr.sort(); // Sort theo string comparison
  return arr[k - 1];
};

// Hoặc cách 2: One-liner siêu ngắn
var findKthNumber = function (n, k) {
  return Array.from({ length: n }, (_, i) => i + 1).sort()[k - 1];
};

// Hoặc cách 3: Dùng DFS đơn giản (reuse code từ bài 386)
var findKthNumber = function (n, k) {
  const result = [];

  function dfs(current) {
    if (current > n) return;
    result.push(current);

    for (let i = 0; i <= 9; i++) {
      const next = current * 10 + i;
      if (next > n) break;
      dfs(next);
    }
  }

  for (let i = 1; i <= 9; i++) {
    if (i > n) break;
    dfs(i);
  }

  return result[k - 1];
};

// Test
function test() {
  console.log("Test n=13, k=2:", findKthNumber(13, 2)); // Expected: 10
  console.log("Test n=1, k=1:", findKthNumber(1, 1)); // Expected: 1
}

test();
