[Link wiki](https://vi.wikipedia.org/wiki/Logarit)

Logarit thường gặp ở các công thức tính độ complex của các bài algo, nên để giải thích sơ lại kiến thức cơ bản của Logarit.

## Giải thích

Logarit là phép toán ngược của phép lũy thừa.

```
a^x = b <=> log_a(b) = x
```

Các công thức cơ bản:

- `log_a(xy) = log_a(x) + log_a(y)` (logarit của tích)
- `log_a(x/y) = log_a(x) - log_a(y)` (logarit của thương)
- `log_a(x^n) = n × log_a(x)` (logarit của lũy thừa)
- `log_a(a) = 1` và `log_a(1) = 0`

Đổi cơ số:

```
log_a(x) = log_b(x) / log_b(a)
```

Trong tin học thường dùng log_2 (logarit cơ số 2).

## Ví dụ

```javascript
function binarySearch(arr: number[], target: number): number {
  let left = 0;
  let right = arr.length - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);

    if (arr[mid] === target) {
      return mid;
    } else if (arr[mid] < target) {
      left = mid + 1; // Loại bỏ nửa trái
    } else {
      right = mid - 1; // Loại bỏ nửa phải
    }
  }

  return -1;
}
```

**Tại sao bài này O(log n)?**
Ví dụ bạn có mảng đã sắp xếp: `[1, 3, 5, 7, 9, 11, 13, 15]` và muốn tìm số 7.

Không gian của bài toán này là **phạm vi tìm kiếm**

```
// Ban đầu: không gian bài toán = toàn bộ mảng
// [1, 3, 5, 7, 9, 11, 13, 15]
//  ^                       ^
// left=0               right=7
// Không gian: 8 phần tử

// Bước 1: mid=3, arr[3]=7
// 11 > 7 → loại bỏ nửa trái (bao gồm cả mid)
// [1, 3, 5, 7] | [9, 11, 13, 15]
//                 ^             ^
//               left=4      right=7
// Không gian còn lại: 4 phần tử (đã chia đôi!)

// Bước 2: mid=5, arr[5]=11
// 11 == 11 → Tìm thấy!
```

Mỗi lần so sánh, ta loại bỏ được một nửa các khả năng - đó chính là "chia đôi không gian bài toán".
