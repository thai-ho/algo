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

**Solution**:

```js
/**
 * Definition for isBadVersion()
 *
 * @param {integer} version number
 * @return {boolean} whether the version is bad
 * isBadVersion = function(version) {
 *     ...
 * };
 */

/**
 * @param {function} isBadVersion()
 * @return {function}
 */
var solution = function (isBadVersion) {
  /**
   * @param {integer} n Total versions
   * @return {integer} The first bad version
   */
  return function (n) {
    
  };
};
```

**Complexity**:
