/**
 * @param {number} n
 * @param {number} k
 * @return {number}
 */

// Brute force
var findKthNumber = function (n, k) {
  const arr = [];
  for (let i = 1; i <= n; i++) {
    arr.push(i);
  }
  arr.sort();
  return arr[k - 1];
};

// DFS cơ bản
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

function test() {
  console.log("Test n=13, k=2:", findKthNumber(13, 2)); // Expected: 10
  console.log("Test n=1, k=1:", findKthNumber(1, 1)); // Expected: 1
}

test();
