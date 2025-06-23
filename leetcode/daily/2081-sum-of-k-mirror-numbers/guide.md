**Problem**:
Số `k`-mirror là một số nguyên dương không có số 0 đứng đầu, đọc giống nhau từ trái sang phải và từ phải sang trái cả trong hệ cơ số 10 và hệ cơ số `k`.

**Example**:
Ví dụ, 9 là số 2-mirror. Biểu diễn của 9 trong hệ cơ số 10 và hệ cơ số 2 lần lượt là 9 và 1001, cả hai đều đọc giống nhau từ trái sang phải và từ phải sang trái.

Ngược lại, 4 không phải là số 2-mirror. Biểu diễn của 4 trong hệ cơ số 2 là 100, không đọc giống nhau từ trái sang phải và từ phải sang trái.

Practicals:

- Example 1:
  `Input: k = 2, n = 5
Output: 25
Explanation:
The 5 smallest 2-mirror numbers and their representations in base-2 are listed as follows:
  base-10    base-2
    1          1
    3          11
    5          101
    7          111
    9          1001
Their sum = 1 + 3 + 5 + 7 + 9 = 25.`

- Example 2:
  `Input: k = 3, n = 7
Output: 499
Explanation:
The 7 smallest 3-mirror numbers are and their representations in base-3 are listed as follows:
  base-10    base-3
    1          1
    2          2
    4          11
    8          22
    121        11111
    151        12121
    212        21212
Their sum = 1 + 2 + 4 + 8 + 121 + 151 + 212 = 499.`

- Example 3:
  `Input: k = 7, n = 17
Output: 20379000
Explanation: The 17 smallest 7-mirror numbers are:
1, 2, 3, 4, 5, 6, 8, 121, 171, 242, 292, 16561, 65656, 2137312, 4602064, 6597956, 6958596`

**Approach**:

1. Phân tích bài toán

Cần tìm n số k-mirror nhỏ nhất
Số k-mirror phải là palindrome trong cả hai hệ: hệ 10 và hệ k
Tính tổng của n số đó

2. Ý tưởng chính
   Thay vì kiểm tra từng số từ 1 đến vô cùng, ta sẽ:

- Sinh ra các palindrome trong hệ 10 (hiệu quả hơn)
- Kiểm tra xem chúng có phải palindrome trong hệ k không

3. Tại sao sinh palindrome hệ 10?

- Palindrome trong hệ 10 ít hơn rất nhiều so với tất cả số nguyên
- Dễ sinh ra theo pattern: 1, 2, ..., 9, 11, 22, ..., 99, 101, 111, 121, ...

**Solution**:

```javascript
/**
 * @param {number} k
 * * @param {number} n
 * @return {number}
 */
var kMirror = function (k, n) {
  // Hàm chuyển số từ hệ 10 sang hệ k
  function toBaseK(num, base) {
    if (num === 0) return "0";
    let result = "";
    while (num > 0) {
      result = (num % base) + result;
      num = Math.floor(num / base);
    }
    return result;
  }

  // Hàm kiểm tra palindrome
  function isPalindrome(str) {
    let left = 0,
      right = str.length - 1;
    while (left < right) {
      if (str[left] !== str[right]) return false;
      left++;
      right--;
    }
    return true;
  }

  // Hàm sinh palindrome hệ 10 theo độ dài
  function generatePalindromes(length) {
    const palindromes = [];

    if (length === 1) {
      for (let i = 1; i <= 9; i++) {
        palindromes.push(i);
      }
      return palindromes;
    }

    const isOdd = length % 2 === 1;
    const halfLength = Math.floor(length / 2);

    // Tạo nửa đầu của palindrome
    const start = Math.pow(10, halfLength - 1);
    const end = Math.pow(10, halfLength) - 1;

    for (let i = start; i <= end; i++) {
      const leftHalf = i.toString();
      let rightHalf = leftHalf.split("").reverse().join("");

      if (isOdd) {
        // Palindrome lẻ: thêm chữ số giữa
        for (let mid = 0; mid <= 9; mid++) {
          const palindrome = parseInt(leftHalf + mid + rightHalf);
          palindromes.push(palindrome);
        }
      } else {
        // Palindrome chẵn
        const palindrome = parseInt(leftHalf + rightHalf);
        palindromes.push(palindrome);
      }
    }

    return palindromes.sort((a, b) => a - b);
  }

  const kMirrors = [];
  let length = 1;

  // Sinh palindrome theo độ dài tăng dần
  while (kMirrors.length < n) {
    const palindromes = generatePalindromes(length);

    for (const palindrome of palindromes) {
      if (kMirrors.length >= n) break;

      // Kiểm tra xem palindrome hệ 10 có phải palindrome hệ k không
      const baseKRepresentation = toBaseK(palindrome, k);
      if (isPalindrome(baseKRepresentation)) {
        kMirrors.push(palindrome);
      }
    }

    length++;
  }

  // Tính tổng n số k-mirror nhỏ nhất
  return kMirrors.slice(0, n).reduce((sum, num) => sum + num, 0);
};
```

**Complexity**:
