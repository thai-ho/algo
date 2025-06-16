## Pattern

Bài này tương tự với bài [1432]("https://github.com/thai-ho/algo/blob/82a85bce4c9a0a65711ef3aac8cfeba1198c0760/leetcode/daily/1432-max-different-you-can-get-from-changing-an-interger/index.js").

Khác nhau ở điểm đổi 1 chữ số effect all.

**Problem**:
Cho `num`. Trả về hiệu số lớn nhất khi chỉ đc phép đổi 1 chữ số trong nằm trong `num`.

**Example**:

1. num = 11891 => max = 99899 (đổi `1` thành `9`), min = 890 (đổi `1` thành `0`)
2. num = 90 => max = 99, min = 0

**Approach**:
Tạo 2 function tìm số lớn nhất và số nhất có thể, khi biến đổi 1 chữ số trong số đó > Để tìm hiệu số lớn nhất.

**Solution**:

```javascript
/**
 * @param {number} num
 * @return {number}
 */
var minMaxDifference = function (num) {
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
    for (let i = 0; i < str.length; i++) {
      if (str[i] === str[0]) {
        return parseInt(str.replaceAll(str[i], "0"));
      }
    }
  }

  const maxNum = getMax(numStr);
  const minNum = getMin(numStr);

  console.log("maxNum", maxNum);
  console.log("minNum", minNum);

  return maxNum - minNum;
};

const test = () => {
  console.log("Test num=11891:", minMaxDifference(11891)); // max 99899, min 00891
  console.log("Test num=90", minMaxDifference(90)); // max 99, min 0
};

test();
```

**Complexity**:

- **Time: O(d)** - d là số chữ số của num (duyệt qua từng digit)
- **Space: O(d)** - Tạo string từ num và các phép replaceAll
