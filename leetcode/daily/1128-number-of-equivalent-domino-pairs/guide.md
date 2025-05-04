**Problem**:
Cho một danh sách các quân domino, mỗi quân domino là một mảng 2 phần tử [a, b]. Hai quân domino [a, b] và [c, d] được gọi là tương đương nếu a = c và b = d, hoặc a = d và b = c. Hãy tìm số cặp quân domino tương đương trong danh sách.

**Example**:
Input: dominoes = [[1,2],[2,1],[3,4],[5,6]]
Output: 1
Giải thích: [1,2] và [2,1] là một cặp tương đương.

Input: dominoes = [[1,2],[1,2],[1,1],[1,2],[2,2]]
Output: 3
Giải thích: [1,2] và [1,2] tạo thành một cặp, và [1,2] với [1,2] tạo thành cặp thứ hai, và [1,2] với [1,2] tạo thành cặp thứ ba.

**Approach**:
1. Để đếm số cặp quân domino tương đương, ta cần tạo ra một khóa duy nhất cho mỗi cặp số tương đương
2. Sử dụng Map để lưu số lượng quân domino tương đương
3. Với mỗi quân domino [a, b], tạo khóa chuẩn hóa bằng cách sắp xếp các số theo thứ tự
4. Mỗi khi gặp quân domino có khóa đã tồn tại, ta cộng thêm số lượng đã gặp trước đó vào kết quả

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
