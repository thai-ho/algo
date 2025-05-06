/**
 * @param {number} n
 * @return {number}
 */
var numTilings = function (n) {
  const mod = 1_000_000_007;

  // base cases
  if (n == 1) return 1;
  if (n == 2) return 2;
  if (n == 3) return 5;

  // Có 3 states khác nhau:
  // dp[i][0] = là số cách lót đầy đủ bảng (2 x i)
  // dp[i][1] = là số cách lót bảng (2 x i) bị thiếu 1 ô ở phía trên ở column i
  // dp[i][2] = là số cách lót bảng (2 x i) bị thiếu 1 ô ở phía dưới ở column i

  // Init dp
  const dp = new Array(n + 1).fill(0).map(() => new Array(3).fill(0));

  // base cases
  dp[0][0] = 1; // Empty board has 1 way to cover it (do nothing)
  dp[1][0] = 1; // A 2x1 board has 1 way (a vertical domino)
  dp[1][1] = 0; // Can't have a 2x1 board with top cell uncovered
  dp[1][2] = 0; // Can't have a 2x1 board with bottom cell uncovered

  for (let i = 2; i <= n; i++) {
    // Cách đặt lót đầy đủ bảng (2 x i):
    // 1. Đặt lót đầy đủ bảng 2x(i-1) và thêm một domino dọc
    // 2. Đặt lót đầy đủ bảng 2x(i-2) và thêm hai domino ngang
    // 3. Đặt lót bảng 2x(i-1) với ô trên cùng chưa lấp đầy và thêm một tromino
    // 4. Đặt lót bảng 2x(i-1) với ô dưới cùng chưa lấp đầy và thêm một tromino
    dp[i][0] =
      (dp[i - 1][0] + dp[i - 2][0] + dp[i - 1][1] + dp[i - 1][2]) % mod;

    // Cách đặt lót bảng 2xi với ô trên cùng chưa lấp đầy:
    // 1. Đặt lót đầy đủ bảng 2x(i-2) và thêm một tromino cụ thể
    // 2. Đặt lót bảng 2x(i-1) với ô dưới cùng chưa lấp đầy và thêm một domino ngang
    dp[i][1] = (dp[i - 2][0] + dp[i - 1][2]) % mod;

    // Cách đặt lót bảng 2xi với ô dưới cùng chưa lấp đầy:
    // 1. Đặt lót đầy đủ bảng 2x(i-2) và thêm một tromino cụ thể
    // 2. Đặt lót bảng 2x(i-1) với ô trên cùng chưa lấp đầy và thêm một domino ngang
    dp[i][2] = (dp[i - 2][0] + dp[i - 1][1]) % mod;
  }

  // Trả về số cách đặt lót đầy đủ bảng (2 x n)
  return dp[n][0];
};

console.log(numTilings(1));
console.log(numTilings(2));
console.log(numTilings(3));
console.log(numTilings(4));
console.log(numTilings(5));
