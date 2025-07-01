## Pattern

**Problem**:
Typer có thể đè nhầm phím kí tự quá lâu, dẫn tới duplicate words. Tìm số lượng chuỗi mà typer định gõ.

**Example**:
Ví dụ 1: word = "abbcccc"

Trường hợp 1: Alice không nhấn nhầm → chuỗi gốc là "abbcccc"
Trường hợp 2: Alice nhấn nhầm ký tự b → chuỗi gốc có thể là "abcccc" (bỏ 1 ký tự b)
Trường hợp 3: Alice nhấn nhầm ký tự c → chuỗi gốc có thể là:

"abbccc" (bỏ 1 ký tự c)
"abbcc" (bỏ 2 ký tự c)
"abbc" (bỏ 3 ký tự c)

**Approach**:
Brute force
Kiểm tra kí tự giống kí tự liền kề, sau đó nhảy tiếp

**Solution**:

```javascript
var possibleStringCount = function (word) {
  // luôn bằng 1 do luôn có case giống word hiện tại
  let rlt = 1;

  for (let i = 0; i < word.length; i++) {
    let count = 1;

    // Đếm kí tự giống kí tự liền kề
    if (i + count < word.length && word[i] === word[i + count]) count++;

    if (count >= 2) {
      rlt += count - 1;
    }
  }

  return rlt;
};
```

**Complexity**:

- Thời gian: O(n) - duyệt qua chuỗi một lần
- Không gian: O(1) - chỉ dùng biến đếm
