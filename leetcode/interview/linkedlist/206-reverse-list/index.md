## Reverse list

**Problem**:
Đảo chiều list

**Example**:

- Input: head = `1->2->3->4->5` → Output: `5->4->3->2->1`

**Approach**:
Khởi tạo 2 prop: `prev` vs `current`. Chạy current và dùng `prev` để assign từng giá trị.

Technique tạm gọi là: Đảo ngược tuần tự

Visualize trước khi xuống phần solutions:

```
Iteration 1:
1. Store next: next = current.next = 2 -> 3 -> 4 -> null
2. Reverse pointer: current.next = prev = null
3. Move prev: prev = current = 1 -> null
4. Move current: current = next = 2 -> 3 -> 4 -> null

After iteration:
prev = 1 -> null
current = 2 -> 3 -> 4 -> null
```

**Solution**:

```javascript
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var reverseList = function (head) {
  let prev = null;
  let current = head;

  while (current !== null) {
    const next = current.next;
    current.next = prev;
    prev = current;
    current = next;
  }

  return prev;
};
```
