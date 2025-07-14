**Problem**

Loại: **Linked List - Traversal**

Cho chuỗi listnode singly-linked list, value của mỗi thằng sẽ là `0` và `1`, nguyên list này ráp lại thành 1 số nhị phân - hệ cơ số 2.

Output trả về số thập phân từ list các số nhị phân như trên.

**Example**:

### Example 1:

<img src="https://assets.leetcode.com/uploads/2019/12/05/graph-1.png" height="128" />

```
  Input: head = [1,0,1]
  Output: 5
  Explanation: (101) in base 2 = (5) in base 10
```

### Example 2:

```
  Input: head = [0]
  Output: 0
```

**Approach**:
Tạo biến current (ListNode), binary string
Current có giá trị thì `binary += current.value`, sau đó moving on qua current.next
Hết chuỗi linked list thì dùng `parseInt` để parse nhị phân thành thập phân (hệ 2 > hệ 10).

**Solution**:

```js
var getDecimalValue = function (head) {
  let current = head;

  let binary = "";

  while (!!current) {
    binary = binary.concat(current.val);
    current = current.next;
  }

  return parseInt(binary, 2);
};
```

**Complexity**:

- **Time Complexity**: O(n) - duyệt qua tất cả n nodes trong linked list một lần
- **Space Complexity**: O(n) - tạo binary string có độ dài n để lưu trữ các bit
