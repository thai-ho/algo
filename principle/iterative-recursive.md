### Recursive (Đệ quy):

- Hàm gọi chính nó
- Sử dụng call stack
- Có thể gây stack overflow với input lớn
- Thường ngắn gọn và dễ hiểu

```javascript
// Ví dụ: Tính factorial bằng đệ quy
function factorialRecursive(n) {
  if (n <= 1) return 1;

  return n * factorialRecursive(n - 1); // Gọi chính nó
}
```

### Iterative (Lặp):

- Sử dụng vòng lặp (for, while)
- Không sử dụng call stack
- An toàn với input lớn
- Thường hiệu quả hơn về memory

```javascript
// Ví dụ: Tính factorial bằng iterative
function factorialIterative(n) {
    let result = 1;

    for (let i = 1; i <= n; i++) {
        result \*= i; // Dùng vòng lặp
    }

    return result;
}
```
