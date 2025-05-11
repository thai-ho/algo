**Problem**:
Input là num[], detect có 3 số lẻ đi liên tiếp

**Example**:

- Example 1:
  Input: arr = [2,6,4,1] > Output: false
  Explanation: There are no three consecutive odds.
- Example 2:
  Input: arr = [1,2,34,3,4,5,7,23,12] > Output: true
  Explanation: [5,7,23] are three consecutive odds.

**Approach**:
Dùng var tạm ngoài scope

Chạy 1 con trỏ, có 3 điều kiện:

- nếu num là số lẻ, var++
- nếu num là chẵn, var về []
- nếu var length = 3, return `true`

**Solution**:

```javascript
var threeConsecutiveOdds = function (arr) {
  let stack = [];

  for (let i = 0; i < arr.length; i++) {
    if (arr[i] % 2 === 0) stack = [];
    else stack.push(arr[i]);

    if (stack.length === 3) return true;
  }

  return false;
};
```

**Complexity**:

- Thời gian: O(n), n là length của var ngoài
- Không gian: O(1)
