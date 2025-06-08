## Pattern

**Problem**:

Điều kiện 1: Cho số n, trả về chuỗi các số từ 1 đến n, sorted theo kí tự từ điển

Điều kiện 2: Viết thuật toán chạy trong 0(n) time và dùng 0(1) space.

**Example**:

- Example 1:

Input: n = 13
Output: [1,10,11,12,13,2,3,4,5,6,7,8,9]

- Example 2:

Input: n = 2
Output: [1,2]

## Cách 1 (tao làm):

**Approach**:
Cách 1 (tôi làm):
Dùng tăng tiến, sau đó dùng sort.

**Solution**:

```javascript
var lexicalOrder = function (n) {
  const arr = [];
  for (let i = 1; i <= n; i++) {
    arr.push(i);
  }

  return arr.sort();
};
```

**Complexity**:
Time: O(NLogN)

1. **Vòng lặp for**: O(n) - Lặp từ 1 đến n để tạo array
2. **Array.sort()**: O(n log n) - JavaScript sử dụng Timsort algorithm
   - So sánh các số dưới dạng string: "1", "10", "11", "12", "13", "2", "3"...
   - Cần O(n log n) phép so sánh để sắp xếp
3. **Tổng**: O(n) + O(n log n) = O(n log n)

Đề bài yêu cầu O(n) time → Cách này O(n log n) ❌

Space: O(n)

1. **Array arr**: O(n) - Lưu trữ n phần tử
2. **Array.sort()**: O(n) - JavaScript sort cần thêm O(n) memory cho temporary storage
3. **Tổng**: O(n) + O(n) = O(n)

Đề bài yêu cầu O(1) space → Cách này O(n) ❌

## Cách 2: DFS Approach

> [FYI Định nghĩa DFS](https://github.com/thai-ho/algo/blob/main/algorithm/dfs.md#-case-study-lexicographical-numbers)

**Approach**:
Sử dụng thuật toán DFS (Depth-First Search) để duyệt các số theo thứ tự từ điển mà không cần sort.

**Ý tưởng**:

1. Bắt đầu từ các số 1-9
2. Với mỗi số hiện tại, thêm các digit 0-9 vào cuối để tạo số mới
3. Duyệt theo chiều sâu (DFS) để đảm bảo thứ tự từ điển
4. Ví dụ: 1 → 10 → 100, 101, ... → 11 → 110, 111, ... → 12 → ... → 19 → 2 → ...

**Solution**:

```javascript
var lexicalOrderOptimal = function (n) {
  const result = [];

  // Helper function để duyệt DFS
  function dfs(current) {
    if (current > n) return;

    result.push(current);

    // Duyệt các số con (thêm digit 0-9 vào cuối)
    for (let i = 0; i <= 9; i++) {
      const next = current * 10 + i;
      if (next > n) break;
      dfs(next);
    }
  }

  // Bắt đầu từ các số 1-9
  for (let i = 1; i <= 9; i++) {
    if (i > n) break;
    dfs(i);
  }

  return result;
};
```

**Complexity**:

- **Time: O(n)** - Mỗi số từ 1 đến n được visit đúng 1 lần
- **Space: O(log n)** - Độ sâu recursion stack tối đa = số chữ số của n

**❓ Tại sao Space được coi là O(1)?**

Trong context của bài toán này:

- Output array: O(n) - bắt buộc phải có
- Algorithm overhead: O(log n) - call stack depth
- So với O(n) của output thì O(log n) negligible → **coi như O(1)**

## Cách 3: Iterative + DFS Approach (0(1))

**Approach**:
Sử dụng thuật toán iterative để simulate DFS mà không dùng recursion stack.

**Ý tưởng**:

1. Bắt đầu với current = 1
2. Tại mỗi bước:
   - Thêm current vào result
   - Thử nhân 10 (đi sâu hơn): 1 → 10 → 100
   - Nếu không thể đi sâu, tăng lên: 100 → 101 → 102
   - Khi gặp số kết thúc bằng 9 hoặc vượt n, backtrack: 109 → 10 → 11

**Solution**:

```javascript
var lexicalOrderIterative = function (n) {
  const result = [];
  let current = 1;

  for (let i = 0; i < n; i++) {
    result.push(current);

    // Thử nhân 10 (đi sâu hơn)
    if (current * 10 <= n) {
      current *= 10;
    }
    // Nếu không thể đi sâu, thử tăng lên
    else {
      // Nếu current kết thúc bằng 9 hoặc current + 1 > n
      // thì phải backtrack
      while (current % 10 === 9 || current + 1 > n) {
        current = Math.floor(current / 10);
      }
      current++;
    }
  }

  return result;
};
```

**Complexity**:

- **Time: O(n)** - Tạo đúng n số, mỗi số 1 operation
- **Space: O(1)** - Chỉ dùng vài biến (current, i), không có recursion stack

( ✅ Thực sự đạt yêu cầu đề bài )

**Ưu điểm của cách này**:

- Thực sự O(1) space (không tính output array)
- Không có risk của stack overflow với n lớn
- Logic rõ ràng và dễ hiểu
