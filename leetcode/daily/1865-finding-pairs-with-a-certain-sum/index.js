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
