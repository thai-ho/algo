## Pattern

**Remind**:

- Tổ hợp là gì?

Tổ hợp chập K của N phần tử là tổng số phép chọn K phần tử trong tập hợp N phần tử. Tổ hợp là một trong những công thức cơ bản trong bộ môn toán xác suất thống kê, bộ môn này có giá trị áp dụng thực tiễn rất cao, có thể nói xác suất thông kê là một trong những môn toán hữu dụng nhất và được áp dụng rộng rãi nhất trong những loại toán được học thời phổ thông.

Ví dụ đơn giản: Có 3 cách chọn 2 loại trái cây trong 3 loại trái cây là xoài, ổi, mít

**Problem**:
Tính tổng số cách có thể chia `n` viên kẹo cho **3** bé, điều kiện là số kẹo của từng bé ko vượt quá `limit`

**Example**:

- Example 1:
  Input: n = 5, limit = 2
  Output: 3
  Explanation: There are 3 ways to distribute 5 candies such that no child gets more than 2 candies: (1, 2, 2), (2, 1, 2) and (2, 2, 1).

- Example 2:
  Input: n = 3, limit = 3
  Output: 10
  Explanation: There are 10 ways to distribute 3 candies such that no child gets more than 3 candies: (0, 0, 3), (0, 1, 2), (0, 2, 1), (0, 3, 0), (1, 0, 2), (1, 1, 1), (1, 2, 0), (2, 0, 1), (2, 1, 0) and (3, 0, 0).

**Approach**:

1. Áp dụng công thức tính tổ hợp, đếm `total` các case (bao gồm case invalid)
2. Đếm từng invalid case như sau, dùng `total` để loại trừ: theo công thức
   - ( Case có ít nhất 1 đứa > limit ) \* 3, tại vì có 3 đứa
   - ( Case có 2 đứa > limit ) \* 2, case12 và case 23
   - Case có 3 đứa > limit, luôn = 0 vì nó chỉ có 1 trường hợp duy nhất

hoặc dùng **Brute force**

**Solution**:

```javascript
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

  // Áp dụng nguyên lý inclusion-exclusion: (https://github.com/thai-ho/algo/blob/main/principle/inclusion-exclusion.md)
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
```

**Complexity**:

**Cách 1:**

- Time: O(1) - fixed number of mathematical operations
- Space: O(1) - only using constant extra space
