/**
 * @param {number} n
 * @param {number} limit
 * @return {number}
 */

// CÁCH 1: Tính tổng tất cả các cách, rồi trừ đi các trường hợp vi phạm
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
  if (n > limit * 3) return 0; // Không thể phân phối
  if (n == limit * 3) return 1; // Chỉ có 1 cách: (limit, limit, limit)

  // Tổng số cách phân phối n viên kẹo cho 3 đứa trẻ (không giới hạn)
  //
  // Sử dụng stars and bars: C(n + 3 - 1, 3 - 1) = C(n + 2, 2)
  let totalWays = combination(n + 2, 2);

  // Case 1: đứa thứ 1 nhận > limit viên
  // Cho đứa thứ 1 (limit + 1) viên trước, còn lại (n - limit - 1) viên phân cho 3 đứa
  let case1 = 0;
  if (n - limit - 1 >= 0) {
    case1 = combination(n - limit - 1 + 2, 2);
  }

  // Case 2: đứa thứ 2 nhận > limit viên
  let case2 = case1; // tương tự case 1

  // Case 3: đứa thứ 3 nhận > limit viên
  let case3 = case1; // tương tự case 1

  // Case 4: đứa thứ 1 VÀ đứa thứ 2 cùng nhận > limit viên
  let case12 = 0;
  if (n - 2 * (limit + 1) >= 0) {
    case12 = combination(n - 2 * (limit + 1) + 2, 2);
  }

  // Case 5: đứa thứ 1 VÀ đứa thứ 3 cùng nhận > limit viên
  let case13 = case12; // tương tự case 12

  // Case 6: đứa thứ 2 VÀ đứa thứ 3 cùng nhận > limit viên
  let case23 = case12; // tương tự case 12

  // Case 7: cả 3 đứa đều nhận > limit viên
  // KHÔNG CẦN TÍNH vì với base cases ở trên, case123 luôn = 0

  let case123 = 0; // luôn bằng 0
  if (n - 3 * (limit + 1) >= 0) {
    case123 = combination(n - 3 * (limit + 1) + 2, 2);
  }

  // Áp dụng nguyên lý inclusion-exclusion:
  // |A ∪ B ∪ C| = |A| + |B| + |C| - |A ∩ B| - |A ∩ C| - |B ∩ C| + |A ∩ B ∩ C|
  let invalidWays = case1 + case2 + case3 - case12 - case13 - case23 + case123;

  return totalWays - invalidWays;
};

// CÁCH 2: Tiếp cận đơn giản hơn - brute force với memoization (cho n nhỏ)
// cách này nhìn đơn giản hơn
var distributeCandiesSimple = function (n, limit) {
  let count = 0;

  // Duyệt qua tất cả các cách phân phối
  for (let child1 = 0; child1 <= Math.min(n, limit); child1++) {
    for (let child2 = 0; child2 <= Math.min(n - child1, limit); child2++) {
      let child3 = n - child1 - child2;
      if (child3 >= 0 && child3 <= limit) {
        count++;
      }
    }
  }

  return count;
};
