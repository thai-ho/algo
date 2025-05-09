# Linked List Problem Solutions

Trước khi deepdive vào Linked List problems, cần phải hiểu cơ bản cấu trúc của nó.
Linked List có 1 cấu trúc linear data, bao gồm:

- Data (the value stored)
- A reference/pointer to the next value

Node cuối cùng sẽ là `null`, đồng nghĩa với end của dãy.

**Properties**: Single vs. double, cyclic vs. linear

**Technique**:

- Two-pointer approach (fast/slow pointers)
- Dummy nodes
- Reversing

```javascript
// Basic structure of a linked list node in JavaScript
class ListNode {
  constructor(val = 0, next = null) {
    this.val = val;
    this.next = next;
  }
}
```

## Common Operations

1. Traversing a Linked List (Đi qua từng node)

```javascript
function traverse(head) {
  let current = head;
  while (current !== null) {
    console.log(current.val); // Process the node
    current = current.next; // Move to next node
  }
}
```

2. Find a Node (Tìm node)

```javascript
function findNode(head, target) {
  let current = head;
  while (current !== null) {
    if (current.val === target) {
      return current; // Found the target
    }
    current = current.next;
  }
  return null; // Target not found
}
```

## Problems Overview

1. [Delete Node in a Linked List](#delete-node-in-a-linked-list)
2. [Remove Nth Node From End of List](#remove-nth-node-from-end-of-list)
3. [Reverse List](#reverse-list)

## Delete Node in a Linked List

**Problem**: Write a function to delete a node in a singly-linked list. You will not be given access to the head of the list, instead you will be given access to the node to be deleted directly.

**Example**:

- Input: head = [4,5,1,9], node = 5 → Output: [4,1,9]
- Input: head = [4,5,1,9], node = 1 → Output: [4,5,9]

**Approach**:

1. Copy the value from the next node to the current node
2. Skip the next node in the list

**Solution**:

```javascript
var deleteNode = function (node) {
  node.val = node.next.val;
  node.next = node.next.next;
};
```

**Complexity**:

- Time: O(1) - We perform constant time operations
- Space: O(1) - No extra space required

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

**Complexity**:

- Time: O(n). Trong đó, n là number của nodes trong List
- Space: O(1). Space bằng 1 do ko cần recursion, dùng in-place

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

## General Strat

- **Runner Technique**: Use `fast` and `slow` pointers for cycle detection, finding middle nodes
- **Recursion**: Great for problems like reversing a linked list
- **Dummy Nodes**: Useful when the head might change
- **Sentinel Nodes**: Simplify edge cases by having placeholder nodes
- **In-place Modification**: Save space by modifying the original list
- **Drawing Diagrams**: Visualize the list and pointer movements
