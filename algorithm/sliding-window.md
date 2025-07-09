Còn gọi là thuật toán cửa sổ trượt, kĩ thuật để tối ưu hoá code, giải quyết các bài toán liên quan tới chuỗi hoặc mảng

## Khái niệm

Idea là thay vì kiểm tra tất cả các tổ hợp con, tôi sẽ duy trì 1 cửa sổ và di chuyển nó qua dữ liệu, thêm phần tử mới vào 1 đầu và loại bỏ phần tử cũ ở đầu kia

Có thể giảm độ phức tạp từ O(n²) hoặc O(n³) xuống O(n).

## Cấu trúc tổng quát

Có 2 loại:

1. Fixed Size Window (Cửa sổ có kích thước cố định)

```js
function fixedSizeWindow(arr, k) {
  let windowSum = 0;
  let result = [];

  // Tính tổng cửa sổ đầu tiên
  for (let i = 0; i < k; i++) {
    windowSum += arr[i];
  }
  result.push(windowSum);

  // Trượt cửa sổ
  for (let i = k; i < arr.length; i++) {
    let oldElement = arr[i - k];
    let newElement = arr[i];

    windowSum += newElement - oldElement;
    result.push(windowSum);
  }

  return result;
}
```

**Ví dụ**:
Tìm tổng lớn nhất của k phần tử liên tiếp

```js
function maxSumSubarray(arr, k) {
  if (arr.length < k) return null;

  let maxSum = 0;
  let windowSum = 0;

  // Tính tổng cửa sổ đầu tiên
  for (let i = 0; i < k; i++) {
    windowSum += arr[i];
  }
  maxSum = windowSum;

  // Trượt cửa sổ và cập nhật maxSum
  for (let i = k; i < arr.length; i++) {
    windowSum += arr[i] - arr[i - k];
    maxSum = Math.max(maxSum, windowSum);

    console.log(`Cửa sổ [${i - k + 1}, ${i}]: ${windowSum}`);
  }

  return maxSum;
}

// Test
const arr = [1, 4, 2, 10, 2, 3, 1, 0, 20];
console.log(maxSumSubarray(arr, 4)); // Output: 24
```

## When to use

**Dấu hiệu nhận biết:**

Bài toán liên quan đến mảng hoặc chuỗi liên tiếp
Tìm kiếm trong một khoảng con (subarray/substring)
Cần tối ưu hóa từ O(n²) về O(n)
Có từ khóa: "liên tiếp", "cửa sổ", "khoảng con"

**Các bài toán phổ biến:**

Tổng lớn nhất/nhỏ nhất của k phần tử liên tiếp
Chuỗi con dài nhất thỏa mãn điều kiện
Số lượng chuỗi con thỏa mãn điều kiện
Tìm kiếm pattern trong chuỗi
