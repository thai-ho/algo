**Problem**:
Input n, trả về số cách mà domino và tromino có thể xếp thành `2 x n` board.

**Example**:
Input: n = 3
Output: 5
![Domino and Tromino Tiling Examples](https://assets.leetcode.com/uploads/2021/07/15/lc-domino1.jpg)
Giải thích: có 5 cách như trên

Input: n = 1
Output: 1
Giải thích: 1 thì chỉ có 1 cách he

**Approach**:
Dùng DP. Trong khi đó:

1. Domino có thể đặt theo chiều ngang (1 x 2) hoặc. dọc (2 x 1)
2. Tromino có hình chữ L, có thể xoay theo nhiều hướng khác nhau
3. Cần tìm số để phủ kín hoàn toàn bảng (2 x n)

Định nghĩa 3 trạng thái DP:

- `dp[i][0]`: Số cách phủ kín hoàn toàn bảng 2xi
- `dp[i][1]`: Số cách phủ bảng 2xi với ô trên cùng ở cột i chưa được phủ
- `dp[i][2]`: Số cách phủ bảng 2xi với ô dưới cùng ở cột i chưa được phủ

**Base cases**:

- dp[0][0] = 1 (không làm gì với bảng trống)
- dp[1][0] = 1 (đặt 1 domino dọc)
- dp[1][1] = dp[1][2] = 0 (không thể có bảng 2x1 với ô trên/dưới chưa phủ)

**Solution**:

Công thức để chuyển trạng thái:

1. Để phủ kín bảng 2xi (dp[i][0]), chúng ta có thể:

   - Phủ kín bảng 2x(i-1) và thêm 1 domino dọc (dp[i-1][0])
   - Phủ kín bảng 2x(i-2) và thêm 2 domino ngang (dp[i-2][0])
   - Phủ bảng 2x(i-1) với ô trên chưa phủ và thêm 1 tromino (dp[i-1][1])
   - Phủ bảng 2x(i-1) với ô dưới chưa phủ và thêm 1 tromino (dp[i-1][2])

   `=> Có 4 cases để phủ kín`

2. Để có bảng 2xi với ô trên chưa phủ (dp[i][1]), chúng ta có thể:

   - Phủ kín bảng 2x(i-2) và thêm 1 tromino đặc biệt (dp[i-2][0])
   - Phủ bảng 2x(i-1) với ô dưới chưa phủ và thêm 1 domino ngang (dp[i-1][2])

   `=> Có 2 cases chưa phủ ô trên cùng ở cột i`

3. Để có bảng 2xi với ô dưới chưa phủ (dp[i][2]), chúng ta có thể:

   - Phủ kín bảng 2x(i-2) và thêm 1 tromino đặc biệt (dp[i-2][0])
   - Phủ bảng 2x(i-1) với ô trên chưa phủ và thêm 1 domino ngang (dp[i-1][1])

   `=> Có 2 cases chưa phủ ô dưới cùng ở cột i`

Đệ quy:

```javascript
    dp[i][0] = dp[i-1][0] + dp[i-2][0] + dp[i-1][1] + dp[i-1][2]
    dp[i][1] = dp[i-2][0] + dp[i-1][2]
    dp[i][2] = dp[i-2][0] + dp[i-1][1]
```

Sau đó trả về case đầu tiên là đẹp

```javascript
    return dp[n][0]
```

**Complexity**:

- Thời gian: O(n) - chúng ta chỉ cần duyệt qua n trạng thái
- Không gian: O(n) - chúng ta lưu trữ mảng DP kích thước n x 3
