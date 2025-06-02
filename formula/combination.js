const combination = (n, k) => {
  if (k > n || k < 0) return 0;
  if (k === 0 || k === n) return 1;

  let result = 1;
  for (let i = 0; i < k; i++) {
    result = (result * (n - i)) / (i + 1);
  }
  return Math.floor(result);
};

// công thức tính tổ hợp
// also called Stars and Bars Theorem
// https://en.wikipedia.org/wiki/Stars_and_bars_(combinatorics)
