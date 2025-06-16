/**
 * @param {number} num
 * @return {number}
 */
var minMaxDifference = function (num) {
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
    for (let i = 0; i < str.length; i++) {
      if (str[i] === str[0]) {
        return parseInt(str.replaceAll(str[i], "0"));
      }
    }
  }

  const maxNum = getMax(numStr);
  const minNum = getMin(numStr);

  console.log("maxNum", maxNum);
  console.log("minNum", minNum);

  return maxNum - minNum;
};

const test = () => {
  console.log("Test num=11891:", minMaxDifference(11891)); // max 99899, min 00891
  console.log("Test num=90", minMaxDifference(90)); // max 99, min 0
};

test();
