**Problem**:
khởi tạo `findSumPairs` có 2 input array `nums1` và `nums2`.

Đề bài tự động có bộ array map với action tương ứng với các function.

`nums1` thì ko được update giá trị, `nums2` thì có.

**Example**:

Ví dụ:
Input

```
["FindSumPairs", "count", "add", "count", "count", "add", "add", "count"]
[[[1, 1, 2, 2, 2, 3], [1, 4, 5, 2, 5, 4]], [7], [3, 2], [8], [4], [0, 1], [1, 1], [7]]
```

Output:

```
[null, 8, null, 2, 1, null, null, 11]
```

**Approach**:
Nhiệm vụ của mình với từng variable như sau:

- `FindSumPairs`:
  Khởi tạo 2 biến `nums1` và `nums2`
  Tạo Map count frequency của `nums2` => thằng này sẽ bị thay đổi giá trị nên cần globalize nó

- `add`:
  Giữ giá trị cũ, add vào chuỗi value mới `val` tại vị trí `index`
  Cập nhật mới frequency của `nums2`

- `count`:
  Lặp `nums1`, tạo biến `needed = tot - num1` để tìm giá trị trong `nums2` và count thôi

**Solution**:

```javascript
/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 */
var FindSumPairs = function (nums1, nums2) {
  this.nums1 = nums1;
  this.nums2 = nums2;

  this.frequency2 = new Map();

  for (let num of nums2) {
    // count dups num
    this.frequency2.set(num, (this.frequency2.get(num) || 0) + 1);
  }
};

/**
 * @param {number} index
 * @param {number} val
 * @return {void}
 */
FindSumPairs.prototype.add = function (index, val) {
  let oldValue = this.nums2[index];

  this.nums2[index] = oldValue + val;
  let newValue = this.nums2[index];

  // xoá frequency của thằng cũ
  this.frequency2.set(oldValue, this.frequency2.get(oldValue) - 1);

  // thằng nào ko còn freq thì xoá
  if (this.frequency2.get(oldValue) === 0) {
    this.frequency2.delete(oldValue);
  }

  // update map thằng mới
  this.frequency2.set(newValue, (this.frequency2.get(newValue) || 0) + 1);
};

/**
 * @param {number} tot
 * @return {number}
 */
FindSumPairs.prototype.count = function (tot) {
  let result = 0;

  // Duyệt qua từng phần tử trong nums1
  for (let num1 of this.nums1) {
    // Tìm giá trị cần thiết trong nums2
    // ví dụ tot = 8; 8 - 3 = 5 => needed bang 5
    let needed = tot - num1;

    // Kiểm tra xem giá trị đó có trong nums2 không
    if (this.frequency2.has(needed)) {
      // Cộng số lần xuất hiện
      result += this.frequency2.get(needed);
    }
  }

  return result;
};
```

**Complexity**:

- **Time Complexity**:

  - `FindSumPairs()`: O(n₂) - build frequency map của nums2
  - `add()`: O(1) - update frequency map
  - `count()`: O(n₁) - duyệt qua nums1, lookup Map là O(1)

- **Space Complexity**: O(n₂) - lưu frequency map của nums2
