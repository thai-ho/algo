## Pattern

**Problem**:
Tính tổng số cách có thể chia `n` viên kẹo cho **3** bé, điều kiện là số kẹo của từng bé ko vượt quá `limit`

**Example**:

- Example 1:
  Input: n = 5, limit = 2
  Output: 3
  Explanation: There are 3 ways to distribute 5 candies such that no child gets more than 2 candies: (1, 2, 2), (2, 1, 2) and (2, 2, 1).

- Example 2:
  Input: n = 3, limit = 3
  Output: 10
  Explanation: There are 10 ways to distribute 3 candies such that no child gets more than 3 candies: (0, 0, 3), (0, 1, 2), (0, 2, 1), (0, 3, 0), (1, 0, 2), (1, 1, 1), (1, 2, 0), (2, 0, 1), (2, 1, 0) and (3, 0, 0).

**Approach**:
1. This is a combinatorics problem using "stars and bars" with constraints
2. Use inclusion-exclusion principle:
   - Calculate total ways without constraints: C(n+2, 2)
   - Subtract violations where ≥1 child gets > limit candies
   - Add back cases where ≥2 children violate (correcting double subtraction)
   - Subtract cases where all 3 children violate

**Solution**:
- Use combination formula C(n,k) = n! / (k! * (n-k)!)
- Apply inclusion-exclusion with careful boundary checking
- Time complexity: O(1) - constant number of operations
- Space complexity: O(1)

**Complexity**:
- Time: O(1) - fixed number of mathematical operations
- Space: O(1) - only using constant extra space
