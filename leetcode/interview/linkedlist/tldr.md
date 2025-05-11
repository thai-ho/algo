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

**Complexity**:

- Time: O(n). Trong đó, n là number của nodes trong List
- Space: O(1). Space bằng 1 do ko cần recursion, dùng in-place

## General Strat

- **Runner Technique**: Use `fast` and `slow` pointers for cycle detection, finding middle nodes
- **Recursion**: Great for problems like reversing a linked list
- **Dummy Nodes**: Useful when the head might change
- **Sentinel Nodes**: Simplify edge cases by having placeholder nodes
- **In-place Modification**: Save space by modifying the original list
- **Drawing Diagrams**: Visualize the list and pointer movements
