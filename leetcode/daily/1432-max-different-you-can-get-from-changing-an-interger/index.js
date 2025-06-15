/**
 * @param {number} num
 * @return {number}
 */
var maxDiff = function (num) {
  const numStr = num.toString();

  function getMax(str) {
    for (let i = 0; i < str.length; i++) {
      if (str[i] !== "9") {
        return parseInt(str.replaceAll(str[i], "9"));
      }
    }
    return parseInt(str);
  }

  function getMin(str) {
    if (str[0] !== "1") {
      return parseInt(str.replaceAll(str[0], "1"));
    }

    for (let i = 1; i < str.length; i++) {
      if (str[i] !== "0" && str[i] !== "1") {
        return parseInt(str.replaceAll(str[i], "0"));
      }
    }

    return parseInt(str);
  }

  const maxNum = getMax(numStr);
  const minNum = getMin(numStr);

  return maxNum - minNum;
};

const test = () => {
  console.log("Test num=555:", maxDiff(555));
  console.log("Test num=9:", maxDiff(9));
  console.log("Test num=123:", maxDiff(123));
  console.log("Test num=1111:", maxDiff(1111));
  console.log("Test num=9000:", maxDiff(9000));
};

test();
