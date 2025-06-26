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
