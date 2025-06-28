/**
 * @param {number[]} nums1
 * @param {number} m
 * @param {number[]} nums2
 * @param {number} n
 * @return {void} Do not return anything, modify nums1 in-place instead.
 */

var merge1 = function (nums1, m, nums2, n) {
  nums1.length = m;

  nums1.push(...nums2);

  nums1.sort((a, b) => a - b);
};

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
