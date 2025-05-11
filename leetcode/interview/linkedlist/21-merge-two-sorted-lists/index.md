## Merge Two Sorted Lists

**Problem**:
Merge hai linked list đã được sắp xếp thành một linked list mới cũng đã được sắp xếp.

**Example**:

- Input: list1 = `1->2->4`, list2 = `1->3->4` → Output: `1->1->2->3->4->4`

**Approach**:
Sử dụng phương pháp "dummy head" để đơn giản hóa việc xử lý head của list mới.

1. Tạo một dummy node làm điểm bắt đầu (để tránh các edge case)
2. Dùng một con trỏ `current` để theo dõi vị trí cuối cùng trong list kết quả
3. So sánh giá trị của node đầu tiên từ mỗi list
4. Chọn node có giá trị nhỏ hơn và gắn vào list kết quả
5. Di chuyển con trỏ trong list đã được chọn đến node tiếp theo
6. Lặp lại cho đến khi một trong hai list rỗng
7. Gắn phần còn lại của list không rỗng vào cuối list kết quả

Visualize quá trình merge:

```
Initial:
list1: 1 -> 2 -> 4 -> null
list2: 1 -> 3 -> 4 -> null
dummy: -1 -> null, current = dummy

Iteration 1:
Compare list1.val (1) and list2.val (1)
They're equal, so take from list1
dummy: -1 -> 1 -> null, current points to 1
list1: 2 -> 4 -> null

Iteration 2:
Compare list1.val (2) and list2.val (1)
list2.val is smaller, take from list2
dummy: -1 -> 1 -> 1 -> null, current points to the second 1
list2: 3 -> 4 -> null

Iteration 3:
Compare list1.val (2) and list2.val (3)
list1.val is smaller, take from list1
dummy: -1 -> 1 -> 1 -> 2 -> null, current points to 2
list1: 4 -> null

Iteration 4:
Compare list1.val (4) and list2.val (3)
list2.val is smaller, take from list2
dummy: -1 -> 1 -> 1 -> 2 -> 3 -> null, current points to 3
list2: 4 -> null

Iteration 5:
Compare list1.val (4) and list2.val (4)
They're equal, so take from list1
dummy: -1 -> 1 -> 1 -> 2 -> 3 -> 4 -> null, current points to 4
list1: null

Since list1 is empty, attach the rest of list2:
dummy: -1 -> 1 -> 1 -> 2 -> 3 -> 4 -> 4 -> null

Final result (after skipping dummy):
1 -> 1 -> 2 -> 3 -> 4 -> 4 -> null
```

**Solution**:

```javascript
/**
 * @param {ListNode} list1
 * @param {ListNode} list2
 * @return {ListNode}
 */
var mergeTwoLists = function (list1, list2) {
  // Create a dummy head to simplify the merging process
  const dummyHead = new ListNode(-1);
  let current = dummyHead;

  // Traverse both lists and compare values
  while (list1 !== null && list2 !== null) {
    if (list1.val <= list2.val) {
      current.next = list1;
      list1 = list1.next;
    } else {
      current.next = list2;
      list2 = list2.next;
    }
    current = current.next;
  }

  // Attach the remaining nodes from either list
  if (list1 !== null) {
    current.next = list1;
  } else {
    current.next = list2;
  }

  // Return the merged list (skip the dummy head)
  return dummyHead.next;
};
```

**Complexity**:

- Time: O(n + m) trong đó n và m lần lượt là độ dài của list1 và list2. Chúng ta chỉ duyệt mỗi node một lần.
- Space: O(1) vì chúng ta chỉ sử dụng một số lượng cố định các biến phụ, không phụ thuộc vào kích thước đầu vào.
