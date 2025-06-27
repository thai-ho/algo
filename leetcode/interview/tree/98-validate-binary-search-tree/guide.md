## Pattern

**Problem**: 
Validate Binary Search Tree - Kiểm tra xem một binary tree có phải là BST hợp lệ không.

**Example**:
```
    2
   / \
  1   3
```
Valid BST: true

```
    5
   / \
  1   4
     / \
    3   6
```
Invalid BST: false (node 3 < 5 nhưng ở right subtree của 5)

**Approach**:
1. **Sai lầm thường gặp**: Chỉ so sánh node với con trực tiếp (node.val > left.val && node.val < right.val)
2. **Cách đúng**: Sử dụng bounds (min, max) cho mỗi node
   - Root có thể có giá trị từ (-∞, +∞)
   - Left child phải trong khoảng (min, parent_val)
   - Right child phải trong khoảng (parent_val, max)

**Solution**:
```javascript
var isValidBST = function (root) {
  function validate(node, min, max) {
    if (!node) return true;
    
    if (node.val <= min || node.val >= max) {
      return false;
    }
    
    return validate(node.left, min, node.val) && 
           validate(node.right, node.val, max);
  }
  
  return validate(root, -Infinity, Infinity);
};
```

**Complexity**:
- Time: O(n) - visit mỗi node một lần
- Space: O(h) - h là height của tree (recursion stack)

