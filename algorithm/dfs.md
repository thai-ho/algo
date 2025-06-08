# DFS (Depth-First Search) - Complete Guide

## 🔍 Định nghĩa

**DFS (Depth-First Search)** là thuật toán duyệt đồ thị/cây theo chiều sâu:

- Đi sâu hoàn toàn một nhánh trước khi chuyển sang nhánh khác
- Sử dụng Stack (hoặc Recursion) để theo dõi path
- Time: O(V + E), Space: O(V) với V là vertices, E là edges

## 🌳 Cấu trúc cơ bản

### Recursive DFS:

```javascript
function dfs(node, visited) {
  if (!node || visited.has(node)) return;

  visited.add(node); // Đánh dấu đã visit
  console.log(node.value); // Process node

  // Duyệt tất cả neighbors
  for (let neighbor of node.neighbors) {
    dfs(neighbor, visited);
  }
}
```

### Iterative DFS:

```javascript
function dfsIterative(startNode) {
  const stack = [startNode];
  const visited = new Set();

  while (stack.length > 0) {
    const node = stack.pop();

    if (visited.has(node)) continue;
    visited.add(node);
    console.log(node.value);

    // Thêm neighbors vào stack (ngược thứ tự)
    for (let i = node.neighbors.length - 1; i >= 0; i--) {
      stack.push(node.neighbors[i]);
    }
  }
}
```

## 🎯 Các trường hợp sử dụng DFS

### 1. **Tree Traversal** - Duyệt cây

```javascript
// Pre-order: Root → Left → Right
function preOrder(root) {
  if (!root) return;

  console.log(root.val); // Process root first
  preOrder(root.left); // Then left
  preOrder(root.right); // Then right
}

// In-order: Left → Root → Right
function inOrder(root) {
  if (!root) return;

  inOrder(root.left); // Left first
  console.log(root.val); // Then root
  inOrder(root.right); // Then right
}

// Post-order: Left → Right → Root
function postOrder(root) {
  if (!root) return;

  postOrder(root.left); // Left first
  postOrder(root.right); // Then right
  console.log(root.val); // Root last
}
```

### 2. **Path Finding** - Tìm đường đi

```javascript
// Tìm path từ start đến target
function findPath(graph, start, target, path = [], visited = new Set()) {
  if (start === target) {
    return [...path, start];
  }

  if (visited.has(start)) return null;

  visited.add(start);
  path.push(start);

  for (let neighbor of graph[start]) {
    const result = findPath(graph, neighbor, target, path, visited);
    if (result) return result;
  }

  path.pop(); // Backtrack
  return null;
}

// Tìm tất cả paths
function findAllPaths(graph, start, target, path = [], visited = new Set()) {
  if (start === target) {
    return [[...path, start]];
  }

  if (visited.has(start)) return [];

  visited.add(start);
  path.push(start);

  let allPaths = [];
  for (let neighbor of graph[start]) {
    const paths = findAllPaths(graph, neighbor, target, path, visited);
    allPaths.push(...paths);
  }

  path.pop();
  visited.delete(start); // Backtrack cho multiple paths
  return allPaths;
}
```

### 3. **Connected Components** - Thành phần liên thông

```javascript
function countConnectedComponents(graph) {
  const visited = new Set();
  let components = 0;

  function dfs(node) {
    if (visited.has(node)) return;

    visited.add(node);
    for (let neighbor of graph[node]) {
      dfs(neighbor);
    }
  }

  for (let node in graph) {
    if (!visited.has(node)) {
      dfs(node);
      components++;
    }
  }

  return components;
}
```

### 4. **Cycle Detection** - Phát hiện chu trình

```javascript
// Directed Graph
function hasCycleDirected(graph) {
  const WHITE = 0,
    GRAY = 1,
    BLACK = 2;
  const colors = {};

  function dfs(node) {
    if (colors[node] === GRAY) return true; // Back edge = cycle
    if (colors[node] === BLACK) return false; // Already processed

    colors[node] = GRAY; // Mark as processing

    for (let neighbor of graph[node] || []) {
      if (dfs(neighbor)) return true;
    }

    colors[node] = BLACK; // Mark as done
    return false;
  }

  for (let node in graph) {
    if (colors[node] === undefined) {
      if (dfs(node)) return true;
    }
  }
  return false;
}

// Undirected Graph
function hasCycleUndirected(graph) {
  const visited = new Set();

  function dfs(node, parent) {
    visited.add(node);

    for (let neighbor of graph[node] || []) {
      if (neighbor === parent) continue; // Skip parent
      if (visited.has(neighbor)) return true; // Cycle found
      if (dfs(neighbor, node)) return true;
    }
    return false;
  }

  for (let node in graph) {
    if (!visited.has(node)) {
      if (dfs(node, null)) return true;
    }
  }
  return false;
}
```

### 5. **Topological Sort** - Sắp xếp topo

```javascript
function topologicalSort(graph) {
  const visited = new Set();
  const stack = [];

  function dfs(node) {
    if (visited.has(node)) return;

    visited.add(node);

    for (let neighbor of graph[node] || []) {
      dfs(neighbor);
    }

    stack.push(node); // Add after processing children
  }

  for (let node in graph) {
    if (!visited.has(node)) {
      dfs(node);
    }
  }

  return stack.reverse(); // Reverse for correct order
}
```

## 🔢 Case Study: Lexicographical Numbers

Bài toán thứ tự từ điển là ví dụ điển hình của DFS trên cấu trúc cây ảo.

### **Tại sao dùng DFS?**

```
Lexicographical order tạo thành cây:
        Root
       /  |  \
      1   2   3 ... 9
     /|   |    \
   10 11  20   30 ...
   /|     |     \
 100 101  200   300 ...
```

### **DFS Approach:**

```javascript
function lexicalOrder(n) {
  const result = [];

  function dfs(current) {
    if (current > n) return;

    result.push(current); // Visit node

    // Duyệt children theo thứ tự 0-9
    for (let i = 0; i <= 9; i++) {
      const next = current * 10 + i;
      if (next > n) break;
      dfs(next); // Go deeper
    }
  }

  // Start từ 1-9 (không có 0 đầu)
  for (let i = 1; i <= 9; i++) {
    if (i > n) break;
    dfs(i);
  }

  return result;
}
```

### **Trace với n=13:**

```
dfs(1):
  push(1) → [1]
  dfs(10): push(10) → [1,10]
  dfs(11): push(11) → [1,10,11]
  dfs(12): push(12) → [1,10,11,12]
  dfs(13): push(13) → [1,10,11,12,13]
  dfs(14): 14 > 13, return
  ...
dfs(2):
  push(2) → [1,10,11,12,13,2]
  dfs(20): 20 > 13, return
dfs(3):
  push(3) → [1,10,11,12,13,2,3]
...

Final: [1,10,11,12,13,2,3,4,5,6,7,8,9]
```

### **Iterative Version (O(1) space):**

```javascript
function lexicalOrderIterative(n) {
  const result = [];
  let current = 1;

  for (let i = 0; i < n; i++) {
    result.push(current);

    // Try go deeper (multiply by 10)
    if (current * 10 <= n) {
      current *= 10;
    }
    // Try go right (increment)
    else {
      // Backtrack if ending with 9 or can't increment
      while (current % 10 === 9 || current + 1 > n) {
        current = Math.floor(current / 10);
      }
      current++;
    }
  }

  return result;
}
```

## 🎨 DFS Patterns & Templates

### **Pattern 1: Simple DFS**

```javascript
function dfs(node, visited = new Set()) {
  if (!node || visited.has(node)) return;

  visited.add(node);
  // Process node

  for (let child of node.children) {
    dfs(child, visited);
  }
}
```

### **Pattern 2: DFS with Path**

```javascript
function dfsWithPath(node, target, path = []) {
  if (!node) return false;

  path.push(node);

  if (node === target) return true;

  for (let child of node.children) {
    if (dfsWithPath(child, target, path)) return true;
  }

  path.pop(); // Backtrack
  return false;
}
```

### **Pattern 3: DFS with Return Value**

```javascript
function dfsWithReturn(node) {
  if (!node) return baseValue;

  let result = processNode(node);

  for (let child of node.children) {
    result = combineResults(result, dfsWithReturn(child));
  }

  return result;
}
```

### **Pattern 4: DFS with State**

```javascript
function dfsWithState(node, state) {
  if (!node) return;

  // Update state
  state.update(node);

  // Process
  if (satisfiesCondition(node, state)) {
    // Do something
  }

  for (let child of node.children) {
    dfsWithState(child, state);
  }

  // Restore state (backtrack)
  state.restore(node);
}
```

## 🚀 Advanced DFS Techniques

### **1. Memoization DFS**

```javascript
function dfsMemo(node, memo = new Map()) {
  if (!node) return 0;
  if (memo.has(node)) return memo.get(node);

  let result = compute(node);
  for (let child of node.children) {
    result += dfsMemo(child, memo);
  }

  memo.set(node, result);
  return result;
}
```

### **2. Multi-source DFS**

```javascript
function multiSourceDFS(sources, graph) {
  const visited = new Set();

  function dfs(node) {
    if (visited.has(node)) return;
    visited.add(node);

    // Process
    for (let neighbor of graph[node]) {
      dfs(neighbor);
    }
  }

  for (let source of sources) {
    if (!visited.has(source)) {
      dfs(source);
    }
  }
}
```

### **3. DFS with Time Stamps**

```javascript
function dfsWithTimestamps(graph) {
  const visited = new Set();
  const startTime = {};
  const endTime = {};
  let time = 0;

  function dfs(node) {
    if (visited.has(node)) return;

    visited.add(node);
    startTime[node] = ++time;

    for (let neighbor of graph[node]) {
      dfs(neighbor);
    }

    endTime[node] = ++time;
  }

  for (let node in graph) {
    if (!visited.has(node)) {
      dfs(node);
    }
  }

  return { startTime, endTime };
}
```

## 💡 Tips & Best Practices

### **1. Khi nào dùng DFS?**

- ✅ Tìm path/solution cụ thể
- ✅ Explore tất cả possibilities
- ✅ Tree traversal
- ✅ Backtracking problems
- ✅ Topological sort
- ❌ Shortest path (dùng BFS)
- ❌ Level-order traversal (dùng BFS)

### **2. DFS vs BFS**

| Aspect                 | DFS                 | BFS                 |
| ---------------------- | ------------------- | ------------------- |
| **Memory**             | O(depth)            | O(width)            |
| **Find any solution**  | ✅ Fast             | ✅ Fast             |
| **Find shortest path** | ❌ No               | ✅ Yes              |
| **All solutions**      | ✅ Good             | ❌ Expensive        |
| **Deep trees**         | ❌ Stack overflow   | ✅ Safe             |
| **Wide trees**         | ✅ Memory efficient | ❌ Memory intensive |

### **3. Common Pitfalls**

```javascript
// ❌ Forget base case
function dfs(node) {
  // Missing: if (!node) return;
  dfs(node.left);
  dfs(node.right);
}

// ❌ Infinite recursion
function dfs(node, visited) {
  // Missing: if (visited.has(node)) return;
  visited.add(node);
  for (let child of node.children) {
    dfs(child, visited);
  }
}

// ❌ Not restoring state
function dfs(node, path) {
  path.push(node);
  if (isTarget(node)) return path;

  for (let child of node.children) {
    if (dfs(child, path)) return path;
  }
  // Missing: path.pop();
}
```

### **4. Optimization Tips**

```javascript
// ✅ Early termination
function dfs(node, target) {
  if (node.value === target) return node; // Found!

  for (let child of node.children) {
    const result = dfs(child, target);
    if (result) return result; // Early return
  }
  return null;
}

// ✅ Iterative for deep recursion
function dfsIterative(root) {
  const stack = [root];

  while (stack.length > 0) {
    const node = stack.pop();
    // Process node

    // Add children in reverse order
    for (let i = node.children.length - 1; i >= 0; i--) {
      stack.push(node.children[i]);
    }
  }
}
```

## 🎯 Conclusion

DFS là một thuật toán cực kỳ linh hoạt và mạnh mẽ:

- **Strengths**: Memory efficient, good for finding any solution, natural for tree problems
- **Weaknesses**: Not optimal for shortest path, can cause stack overflow
- **Best for**: Backtracking, tree traversal, pathfinding, cycle detection

Trong bài toán Lexicographical Numbers, DFS shine vì nó naturally follow thứ tự từ điển mà không cần sort, đạt được O(n) time complexity yêu cầu.

**Key takeaway**: DFS không chỉ là thuật toán duyệt đồ thị, mà là một mindset để giải quyết problems có structure phân cấp hoặc cần explore tất cả possibilities.
