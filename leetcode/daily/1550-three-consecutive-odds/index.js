/**
 * @param {number[]} arr
 * @return {boolean}
 */
var threeConsecutiveOdds = function (arr) {
  let stack = [];

  for (let i = 0; i < arr.length; i++) {
    if (arr[i] % 2 === 0) stack = [];
    else stack.push(arr[i]);

    if (stack.length === 3) return true;
  }

  return false;
};
