**Problem**:
Input n, trả về số cách mà domino và tromino có thể xếp thành `2 x n` board.

**Example**:
Input: n = 3
Output: 5
![Domino and Tromino Tiling Examples](https://assets.leetcode.com/uploads/2021/07/15/lc-domino1.jpg)
Giải thích: có 5 cách như trên

Input: n = 1
Output: 1
Giải thích: 1 thì chỉ có 1 cách he

**Approach**:

1. 

**Solution**:

```javascript
var numEquivDominoPairs = function (dominoes) {
  const countMap = new Map();
  let output = 0;

  for (let i = 0; i < dominoes.length; i++) {
    const a = dominoes[i][0];
    const b = dominoes[i][1];

    // Tạo khóa chuẩn hóa để [a,b] và [b,a] có cùng khóa
    const key = a < b ? `${a},${b}` : `${b},${a}`;

    // Đếm số lượng quân domino tương đương đã gặp trước đó
    let count = countMap.get(key) || 0;

    // Cộng thêm vào kết quả số cặp mới tạo thành
    output += count;

    // Tăng số lượng quân domino có khóa này
    countMap.set(key, count + 1);
  }

  return output;
};
```

**Complexity**:

- Thời gian: O(n), với n là số lượng quân domino. Ta chỉ cần duyệt qua mỗi quân domino một lần.
- Không gian: O(n), trong trường hợp xấu nhất, tất cả các quân domino đều khác nhau và ta cần lưu n khóa trong Map.
