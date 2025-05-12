## Pattern

**Problem**:
Trả về độ sâu cao nhất của cây

```
    1
   / \
  2   3
 /     \
4       5
         \
          6
```

**Example**:
- Example 1:
Input: root = [3,9,20,null,null,15,7]
Output: 3

- Example 2:
Input: root = [1,null,2]
Output: 2

**Approach**:
1. Tạo base case bằng null, `return 0`
2. Check Math max của 2 nhánh trái phải, so sánh và return maximum

**Solution**:
```javascript
var maxDepth = function (root) {
  // base case
  if (root === null) {
    return 0;
  }

  const leftDepth = maxDepth(root.left);
  const rightDepth = maxDepth(root.right);

  return Math.max(leftDepth, rightDepth) + 1;
};
```

**Complexity**:


https://leetcode.com/problems/maximum-depth-of-binary-tree/description/
