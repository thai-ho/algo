/**
 * @param {number} n
 * @param {number} limit
 * @return {number}
 */
var distributeCandies = function (n, limit) {
    // công thức tính tổ hợp
    const combination = (n, k) => {
    if (k > n || k < 0) return 0;
    if (k === 0 || k === n) return 1;

    let result = 1;
    for (let i = 0; i < k; i++) {
      result = (result * (n - i)) / (i + 1);
    }
    return Math.floor(result);
  };

  // Base case
  if (n > limit * 3) return 0;

  // Using inclusion-exclusion principle
  // Dùng phương pháp lấy tổng trừ từng negative case để có số cuối cùng 

  // Tổng số cách, chưa kể tới constraints
  // C(n+2, 2)

  // tại sao lại là n+2?
  
  let total = combination(n + 2, 2);

  // Subtract cases where at least one child gets more than limit candies
  // If child 1 gets > limit, then we distribute (n - limit - 1) among 3 children
  if (n - limit - 1 >= 0) {
    total -= 3 * combination(n - limit - 1 + 2, 2);
  }

  // Add back cases where at least two children get > limit candies
  // If 2 children get > limit each, then we distribute (n - 2*(limit+1)) among 3 children
  if (n - 2 * (limit + 1) >= 0) {
    total += 3 * combination(n - 2 * (limit + 1) + 2, 2);
  }

  // Subtract cases where all three children get > limit candies
  // If all 3 children get > limit each, then we distribute (n - 3*(limit+1)) among 3 children
  if (n - 3 * (limit + 1) >= 0) {
    total -= combination(n - 3 * (limit + 1) + 2, 2);
  }

  return total;
};
