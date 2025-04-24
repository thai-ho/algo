# Linked List Problem Solutions

This directory contains solutions to various linked list problems from LeetCode. Below you'll find details about each problem, the approach used to solve it, and an explanation of the solution.

## Problems Overview

1. [Delete Node in a Linked List](#delete-node-in-a-linked-list)

## Approaching Linked List Problems: A Mentor's Guide

When approaching linked list problems, remember to:

1. **Understand linked list properties** - Single vs. double, cyclic vs. linear
2. **Consider edge cases** - Empty lists, single nodes, cycles
3. **Choose the right technique**:
   - Two-pointer approach (fast/slow pointers)
   - Dummy nodes
   - Recursion
   - In-place modification
   - Sentinel nodes

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
var deleteNode = function(node) {
  node.val = node.next.val;
  node.next = node.next.next;
};
```

**Complexity**:

- Time: O(1) - We perform constant time operations
- Space: O(1) - No extra space required

## General Linked List Problem Strategies

- **Runner Technique**: Use fast and slow pointers for cycle detection, finding middle nodes
- **Recursion**: Great for problems like reversing a linked list
- **Dummy Nodes**: Useful when the head might change
- **Sentinel Nodes**: Simplify edge cases by having placeholder nodes
- **In-place Modification**: Save space by modifying the original list
- **Drawing Diagrams**: Visualize the list and pointer movements

Remember to practice these problems with different input structures to strengthen your understanding!