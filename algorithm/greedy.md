Còn gọi là thuật toán tham lam, phương pháp giải quyết vấn đề bằng cách đưa ra lựa chọn tối ưu tại từng bước, với hy vọng rằng việc tối ưu hóa từng bước sẽ dẫn đến giải pháp tối ưu tổng thể.

## Đặc điểm

**Nguyên tắc cơ bản**: Tại mỗi bước, chọn option tốt nhất khi có thể, không xem xét đến hậu quả trong tương lai.

**Cách hoạt động**: Thuật toán tham lam xây dựng giải pháp từng bước một. Tại mỗi bước, nó chọn lựa chọn có vẻ tốt nhất trong thời điểm hiện tại (lựa chọn tham lam), không bao giờ quay lại thay đổi các lựa chọn đã đưa ra trước đó.

## Cấu trúc tổng quát

```javascript
function greedyAlgorithm(input) {
  let solution = [];
  let candidates = getCandidates(input); // candidates match với solution

  // Chạy vòng lặp để tìm best candidate matched
  while (candidates.length > 0 && !isSolutionComplete(solution)) {
    let bestCandidate = selectBestCandidate(candidates);

    // check khả thi
    if (isFeasible(bestCandidate, solution)) {
      solution.push(bestCandidate);
    }

    // moving on to next candidate
    candidates = getNextCandidates(candidates, bestCandidate);
  }

  return solution;
}
```

## Ví dụ

1. **Đổi tiền:**

Giả sử bạn có các mệnh giá tiền: 500, 200, 100, 50, 20, 10, 5, 1 (VND) và cần đổi số tiền 1230 VND với số tờ tiền ít nhất.

```js
function coinChange(amount) {
  const coins = [500, 200, 100, 50, 20, 10, 5, 1];
  const result = [];

  for (let coin of coins) {
    while (amount >= coin) {
      result.push(coin);
      amount -= coin;
    }
  }

  return result;
}

console.log(coinChange(1230));
// Output: [500, 500, 200, 20, 10] - tổng 5 tờ tiền
```

2. **Ví dụ 2:** [2410 Tìm maximum matching giữa player và trainer](https://github.com/thai-ho/algo/blob/1dc396896975e414c884b2efb71286605cc0e891/leetcode/daily/2410-maximum-matching-of-players-with-trainers/index.js)

## Pros & Cons

**Ưu điểm:**

Đơn giản, dễ hiểu và dễ triển khai
Thời gian chạy nhanh (thường O(n) hoặc O(n log n))
Sử dụng ít bộ nhớ

**Nhược điểm**:

Không phải lúc nào cũng cho ra kết quả tối ưu
Khó chứng minh tính đúng đắn
Chỉ áp dụng được cho một số bài toán cụ thể

## When to use
