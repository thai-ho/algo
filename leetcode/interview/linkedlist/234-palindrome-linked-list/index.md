## Palindrome Linked List

**Problem**:
Palindrome là chuỗi đọc từ trái qua phải, hoặc ngược lại đều giống nhau.

Bài toán có một số thách thức:

Danh sách liên kết chỉ cho phép duyệt một chiều (từ đầu đến cuối)
Làm sao để so sánh từ cuối về đầu mà không cần duyệt lại từ đầu mỗi lần?
Làm sao để giải quyết với không gian phụ O(1) (không dùng mảng phụ)?

**Example**:
Input: head = [1,2,2,1] → Output: `true`
Input: head = [1,2] → Output: `false`

**Approach**:

Gồm 3 bước chính, vừa tiếp cận vừa visualize:

1. Tìm điểm giữa của danh sách liên kết
   Áp dụng thủ pháp cơ bản, 2 con trỏ `fast` & `slow`.

```javascript
let slow = head;
let fast = head;

while (fast && fast.next) {
  slow = slow.next; // Di chuyển 1 bước
  fast = fast.next.next; // Di chuyển 2 bước
}
```

2. Đảo ngược nửa sau của danh sách
   `slow` trỏ đến điểm giữa, đảo ngược điểm giữa ngay tại đây.

```javascript
let prev = null;
let current = slow;
let next = null;

while (current) {
  next = current.next; // Lưu node kế tiếp
  current.next = prev; // Đảo chiều con trỏ
  prev = current; // Di chuyển prev tiến lên
  current = next; // Di chuyển current tiến lên
}
```

3. So sánh nửa đầu với nửa sau đã đảo ngược
   Giờ ta so sánh từng node của nửa đầu (bắt đầu từ head) với nửa sau đã đảo ngược (bắt đầu từ prev):

```javascript
let firstHalfPtr = head;
let secondHalfPtr = prev;

while (secondHalfPtr) {
  if (firstHalfPtr.val !== secondHalfPtr.val) {
    return false; // Không phải palindrome
  }
  firstHalfPtr = firstHalfPtr.next;
  secondHalfPtr = secondHalfPtr.next;
}
```

**Solution**:

```javascript
var isPalindrome = function (head) {
  // Xử lý trường hợp đặc biệt: danh sách rỗng hoặc chỉ có 1 node
  if (!head || !head.next) return true;

  // Bước 1: Tìm điểm giữa của danh sách
  let slow = head;
  let fast = head;

  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
  }

  // Bước 2: Đảo ngược nửa sau của danh sách
  let prev = null;
  let current = slow;
  let next = null;

  while (current) {
    next = current.next;
    current.next = prev;
    prev = current;
    current = next;
  }

  // Bước 3: So sánh nửa đầu với nửa sau đã đảo ngược
  let firstHalfPtr = head;
  let secondHalfPtr = prev;

  while (secondHalfPtr) {
    if (firstHalfPtr.val !== secondHalfPtr.val) {
      return false;
    }

    firstHalfPtr = firstHalfPtr.next;
    secondHalfPtr = secondHalfPtr.next;
  }

  return true;
};
```

**Complexity**:

Độ phức tạp thời gian: **O(n)**

- Tìm điểm giữa: O(n/2)
- Đảo ngược nửa sau: O(n/2)
- So sánh hai nửa: O(n/2)

Độ phức tạp không gian: **O(1)**
