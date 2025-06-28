[Leetcode](https://leetcode.com/problems/merge-sorted-array/description/)

**Problem**:
Hợp nhất 2 mảng đã được sắp xếp vào nums1. nums1 có độ dài m+n (m số thực + n chỗ trống), nums2 có n phần tử.

**Example**:
nums1 = [1,2,3,0,0,0], m = 3
nums2 = [2,5,6], n = 3
Output: [1,2,2,3,5,6]

**Approach**:

1. Loại bỏ phần tử thừa (số 0) trong nums1
2. Thêm tất cả phần tử nums2 vào nums1
3. Sắp xếp lại toàn bộ mảng

**Solution 1 (Simple but not optimal)**:

```javascript
const merge1 = (nums1, m, nums2, n) => {
  nums1.length = m; // Cắt bỏ n số 0 cuối
  nums1.push(...nums2); // Thêm nums2 vào cuối
  nums1.sort((a, b) => a - b); // Sắp xếp tăng dần
};
```

**Complexity option 1**:

- Time: O((m+n) log(m+n)) - do sort()
- Space: O(1) - modify in-place

**Solution 2 (Optimal - Two pointers)**:

```javascript
const merge2 = (nums1, m, nums2, n) => {
  let i = m - 1; // Pointer cho nums1
  let j = n - 1; // Pointer cho nums2
  let k = m + n - 1; // Pointer cho vị trí cuối nums1

  // Merge từ cuối về đầu
  while (i >= 0 && j >= 0) {
    if (nums1[i] > nums2[j]) {
      nums1[k] = nums1[i];
      i--;
    } else {
      nums1[k] = nums2[j];
      j--;
    }
    k--;
  }

  // Copy phần tử còn lại của nums2 (nếu có)
  while (j >= 0) {
    nums1[k] = nums2[j];
    j--;
    k--;
  }
};
```

**Complexity option 2**:

- Time: O(m + n) - duyệt qua mỗi phần tử một lần
- Space: O(1) - chỉ dùng constant extra space
