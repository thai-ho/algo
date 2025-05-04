/**
 * @param {number[][]} dominoes
 * @return {number}
 */
var numEquivDominoPairs = function (dominoes) {
  const countMap = new Map();
  let output = 0;

  for (let i = 0; i < dominoes.length; i++) {
    const a = dominoes[i][0];
    const b = dominoes[i][1];

    // Fix: Make sure the format is consistent by removing the space
    const key = a < b ? `${a},${b}` : `${b},${a}`;

    let count = countMap.get(key) || 0;

    output += count;

    countMap.set(key, count + 1);
  }

  return output;
};

const count = numEquivDominoPairs([
  [1, 2],
  [2, 1],
  [3, 4],
  [5, 6],
]);

console.log(count);
