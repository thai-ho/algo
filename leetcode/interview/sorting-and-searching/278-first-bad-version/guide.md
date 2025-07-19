**Problem**:
Bạn là một product manager và hiện đang dẫn dắt một team để phát triển sản phẩm mới. Thật không may, phiên bản mới nhất của sản phẩm không vượt qua được bài kiểm tra chất lượng. Vì mỗi phiên bản được phát triển dựa trên phiên bản trước đó, nên tất cả các phiên bản sau một phiên bản lỗi cũng sẽ bị lỗi.

Giả sử bạn có n phiên bản [1, 2, ..., n] và bạn muốn tìm ra phiên bản lỗi đầu tiên, cái mà gây ra tất cả các phiên bản tiếp theo cũng bị lỗi.

Bạn được cung cấp một API `bool isBadVersion(version)` để kiểm tra xem phiên bản có bị lỗi hay không. Hãy implement một function để tìm phiên bản lỗi đầu tiên. Bạn cần tối thiểu hóa số lần gọi API.

**Example**:

### Example 1:

```
Input: n = 5, bad = 4
Output: 4

Explanation:
call isBadVersion(3) -> false
call isBadVersion(5) -> true
call isBadVersion(4) -> true
Then 4 is the first bad version.
```

### Example 2:

```
Input: n = 1, bad = 1
Output: 1
```

**Approach**:
Có rất nhiều cách giải, nhưng cần phải tìm cách nào để tối ưu nhất, Làm sao tìm được phiên bản lỗi đầu tiên mà không phải kiểm tra từng version một?

- Idea #1 là brute force

```
Đọc mảng từ 1 tới n để kiểm tra bad version đầu tiên -> Cách này bị Time Exceeded
```

- Idea #2 là dùng binary search kiểm tra theo cặp

```
Chia đôi range liên tục
Nếu mid là bad → first bad ở bên trái (hoặc chính là mid)
Nếu mid là good → first bad ở bên phải
```

- Idea #3: Exponential Search

```
Tăng theo cấp số nhân: 1, 2, 4, 8, 16...
Tìm range chứa first bad, rồi binary search trong range đó
```

- Idea #4: Ternary Search

```
Chia làm 3 phần thay vì 2
Có thể giảm số lần so sánh trong một số trường hợp
```

**Solution**:

```js
// #1: brute force (Naive) > Time exceeded with large nums
var solution = function (isBadVersion) {
  /**
   * @param {integer} n Total versions
   * @return {integer} The first bad version
   */
  return function (n) {};
};

// #2: Binary search
var solution = function (isBadVersion) {
  return function (n) {
    let left = 1;
    let right = n;

    while (left < right) {
      let mid = Math.floor((left + right) / 2);

      if (isBadVersion(mid)) {
        // mid is bad, first bad có thể là mid hoặc ở bên trái
        right = mid;
      } else {
        // mid is good, first bad chắc chắn ở bên phải
        left = mid + 1;
      }
    }

    return left; // left == right = first bad version
  };
};
```

**Complexity**:
