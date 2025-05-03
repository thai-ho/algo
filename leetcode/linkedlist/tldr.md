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

## General Strat

- **Runner Technique**: Use `fast` and `slow` pointers for cycle detection, finding middle nodes
- **Recursion**: Great for problems like reversing a linked list
- **Dummy Nodes**: Useful when the head might change
- **Sentinel Nodes**: Simplify edge cases by having placeholder nodes
- **In-place Modification**: Save space by modifying the original list
- **Drawing Diagrams**: Visualize the list and pointer movements
