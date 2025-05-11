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
