/**
 * @param {string} word
 * @return {number}
 */
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

console.log(`Output: ${possibleStringCount("abbcccc")}`); // Expected: 5
// abbcccc
// abbccc
// abbcc
// abbc
// abcccc
