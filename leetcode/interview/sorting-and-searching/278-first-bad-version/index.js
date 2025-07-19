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
