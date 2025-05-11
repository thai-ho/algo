## Linked List Cycle

**Problem**: Check list xem có có rớt vào vòng lặp ko.

**Example**:

- Solution 1:

```
Input: head = [3,2,0,-4], pos = 1
Output: true
```

- Solution 2:

```
Input: head = [1,2], pos = 0
Output: true
Explanation: There is a cycle in the linked list, where the tail connects to the 0th node.
```

- Solution 3:

```
Input: head = [1], pos = -1
Output: false
Explanation: There is no cycle in the linked list.
```

**Approach**:

1. Loại trừ base case như `head === null` (list rỗng) hoặc `head.next === null` (list 1 giá trị)
2. Áp dụng chạy 2 con trỏ để dò **fast** và **slow** đứng trên cùng 1 node lần thứ 2, chạy liên tục khi **fast** và **fast.next** exists. => Sau cùng `fast.next === null` thì return false.

**Solution**:

```javascript
var hasCycle = function (head) {
  // Nếu list rỗng hoặc chỉ có 1 node, không thể có cycle
  if (head === null || head.next === null) return false;

  let slow = head;
  let fast = head;

  // Tiếp tục lặp cho đến khi phát hiện cycle hoặc đến cuối list
  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;

    // 2 khứa này gặp nhau nghĩa là đang trên cùng 1 node
    if (slow === fast) {
      return true;
    }
  }

  // Nếu fast hoặc fast.next là null, không có cycle
  return false;
};
```

**Complexity**:

- Thời gian: O(n), trong đó n là số lượng node trong linked list.
- Không gian: O(1) - bộ nhớ sử dụng không phụ thuộc vào kích thước đầu vào.

