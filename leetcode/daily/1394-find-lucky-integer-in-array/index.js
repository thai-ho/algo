/**
 * @param {number[]} arr
 * @return {number}
 */
var findLucky = function (arr) {
  let luckyNumber = -1;
  let frequencyMap = {}; // {number: frequency}

  // Tổng hợp lại bằng object các số kèm frequency
  arr.forEach((number) => {
    if (frequencyMap[number]) frequencyMap[number] += 1;
    else frequencyMap[number] = 1;
  });

  for (let number in frequencyMap) {
    let frequency = frequencyMap[number]; // cho nay number la key cua object
    console.log("Checking number", number, "with frequency", frequency);

    // neu number = frequency => la lucky number
    if (parseInt(number) == frequency) {
      if (parseInt(number) > luckyNumber) {
        // condition nay co 2 nhiem vu,
        // override initial lucky num la -1
        // va tiep tuc override khi co lucky num lon hon
        luckyNumber = parseInt(number);
      }
    }
  }

  return luckyNumber;
};

// console.log(findLucky([2, 2, 3, 4])); // Expect return 2
console.log(findLucky([1, 2, 2, 3, 3, 3])); // Expect return 3
// console.log(findLucky([2, 2, 2, 3, 3])); // Expect return -1
