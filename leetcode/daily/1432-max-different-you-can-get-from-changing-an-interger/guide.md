## Pattern

**Problem**:
Cho bạn một số nguyên num, và bạn cần thực hiện một phép biến đổi hai lần riêng biệt để tạo ra hai số khác nhau a và b, sau đó tìm hiệu số lớn nhất giữa chúng.

Input: Một số nguyên num

Output: Hiệu số lớn nhất có thể giữa a và b

**Example**:

- Example 1:

Input: num = 555
Output: 888
Explanation: The first time pick x = 5 and y = 9 and store the new integer in a.
The second time pick x = 5 and y = 1 and store the new integer in b.
We have now a = 999 and b = 111 and max difference = 888

- Example 2:

Input: num = 9
Output: 8
Explanation: The first time pick x = 9 and y = 9 and store the new integer in a.
The second time pick x = 9 and y = 1 and store the new integer in b.
We have now a = 9 and b = 1 and max difference = 8

**Approach**:
Tạo 2 function tìm số lớn nhất và số nhất có thể khi biến đổi 1 chữ số trong số đó > Để tìm hiệu số lớn nhất
vd:

- Số lớn: `1234` -> `9234`, `9123` -> `9923`. Function tìm số lớn, chạy brute force tìm chữ số khác 9 đầu tiên để biến đổi.
- Số nhỏ: `1234` -> `1134`, `2234` -> `1234`, `0123` là số ko hợp lệ do chỉ có 3 số. Fucntion tìm số nhỏ, chạy brute force cho 2 trường hợp sau đây:
  - Số đầu tiên là số **khác 1**, thì sẽ biến đổi thành **1**
  - Số thứ hai trở đi **khác 0 và 1**,

**Solution**:

```javascript
/**
 * @param {number} num
 * @return {number}
 */
var maxDiff = function (num) {
  const numStr = num.toString();

  function getMax(str) {
    for (let i = 0; i < str.length; i++) {
      if (str[i] !== "9") {
        return parseInt(str.replaceAll(str[i], "9"));
      }
    }
    return parseInt(str);
  }

  function getMin(str) {
    if (str[0] !== "1") {
      return parseInt(str.replaceAll(str[0], "1"));
    }

    for (let i = 1; i < str.length; i++) {
      if (str[i] !== "0" && str[i] !== str[0]) {
        return parseInt(str.replaceAll(str[i], "0"));
      }
    }

    return parseInt(str);
  }

  const maxNum = getMax(numStr);
  const minNum = getMin(numStr);

  return maxNum - minNum;
};
```

**Complexity**:

- **Time: O(d)** - d là số chữ số của num (duyệt qua từng digit)
- **Space: O(d)** - Tạo string từ num và các phép replaceAll
