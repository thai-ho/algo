## Remove Nth Node From End of List

**Problem**:
Xoá nth node tính từ cuối dãy => return lại list mới.

**Example**:

- Input: head = `1->2->3->4->5`, nth = 2 → Output: `1->2->3->5`

**Approach**:
Linked list thường chỉ read traversingly (đọc hướng tới) => ko biết được length của list.

1. **Approach 1**: 2 bước

- Tìm length của list => bước 1
- Xoá phần từ thứ `(length - n)th` từ đầu dãy => bước 2

=> Pros: Straightforward
=> Cons: Cần thực hiện 2 bước

2. **Approach 2**: 1 bước, dùng 2 pointers (có `slow` and `fast` node sliding)

- Init `fast` and `slow` at index **1**
- Then, move `fast` by `nth` step
- Tiếp theo, move cả 2 thằng `fast` and `slow` mỗi đứa 1 bước
- Cho đến khi `fast` chạm `null` => Reach the end of list

Ok, visualize ở dưới này cho dễ hiểu hơn:

```
Initial state:
fast = head (points to 1)
slow = head (points to 1)

Step 1: Move fast nth steps ahead
fast is moved 2 steps: fast now points to 3
slow still points to 1

Step 2: Move both pointers until fast reaches the end
- Move both: fast = 4, slow = 2
- Move both: fast = 5, slow = 3
- fast.next is null, so we stop

Step 3: Remove nth node from the end
slow.next (4) is the node to remove
Set slow.next = slow.next.next to skip 4
Result: 1->2->3->5
```

**Solution**:

```javascript
/**
 * @param {ListNode} head
 * @param {number} n
 * @return {ListNode}
 */

var removeNthFromEnd = function (head, n) {
  // Init listnode
  const dummy = new ListNode(0);
  dummy.next = head;

  let fast = dummy;
  let slow = dummy;

  // Move fast to n, +1 để move tới node có khoảng cách so với slow bằng n
  for (let i = 0; i <= n; i++) {
    fast = fast.next;

    // case này để ràng buộc n === null => end của list
    // hoặc n quá lớn, lớn hơn list length thì return head
    if (i < n && !fast) return head; // This is an edge case check
  }

  // chạy fast và slow
  while (fast) {
    fast = fast.next;
    slow = slow.next;
  }

  // fast dừng, xoá node tiếp theo của slow
  slow.next = slow.next.next;

  // Return head mới
  return dummy.next;
};
```

**Complexity**:

- Time: O(L) where L is the length of the linked list - We traverse at most twice through the list (once to move fast pointer ahead, and once to move both pointers)
- Space: O(1) - We only use a fixed amount of extra space (dummy node and two pointers)
