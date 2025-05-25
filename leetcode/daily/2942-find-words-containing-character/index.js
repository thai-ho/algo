/**
 * @param {string[]} words
 * @param {character} x
 * @return {number[]}
 */
var findWordsContaining = function (words, x) {
  // return [...words.flatMap((word, idx) => {
  //     if (word.includes(x)) return idx
  // })] >>> this need to use filter

  // cách khác, dùng reduce
  // return words.reduce((result, word, idx) => {
  //     if (word.includes(x)) result.push(idx);
  //     return result;
  // }, []);

  const arr = [];

  for (const [index, word] of words.entries()) {
    for (const letter of word) {
      if (letter == x) {
        arr.push(index);
        break;
      }
    }
  }

  return arr;
};
