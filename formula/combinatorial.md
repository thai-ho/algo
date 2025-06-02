# TLDR

## 🎯 Tóm tắt

### Công thức tổ hợp

```
C(n,k) = n! / (k! × (n-k)!)
```

### Implementation tối ưu

```javascript
// Thay vì tính giai thừa đầy đủ
result = (n × (n-1) × ... × (n-k+1)) / (1 × 2 × ... × k)
```

### Ưu điểm

1. **Tránh overflow** với số lớn
2. **Performance tốt** hơn O(min(k, n-k))
3. **Ổn định** về mặt số học

### Ứng dụng trong bài toán

- **Stars and Bars:** Phân phối n vật giống nhau
- **Inclusion-Exclusion:** Đếm các trường hợp hợp lệ
- **Optimization:** Base cases và early returns

**Kết luận:** Đây là implementation chuẩn và hiệu quả nhất để tính tổ hợp trong lập trình!

---

# Công thức tính tổ hợp - Combinatorics (Stars and Bars) - C(n,k)

Links:

- https://en.wikipedia.org/wiki/Stars_and_bars_(combinatorics)

## 🎯 Định nghĩa cơ bản

**Tổ hợp C(n,k)** = Số cách chọn k phần tử từ n phần tử, **không quan tâm thứ tự**

### Công thức toán học

```
C(n,k) = n! / (k! × (n-k)!)
```

**Ví dụ:** C(5,2) = 5!/(2!×3!) = (5×4×3!)/(2×1×3!) = 20/2 = 10

---

## 💻 Phân tích code implementation

### Code gốc

```javascript
const combination = (n, k) => {
  if (k > n || k < 0) return 0; // Base cases
  if (k === 0 || k === n) return 1; // Special cases

  let result = 1;
  for (let i = 0; i < k; i++) {
    result = (result * (n - i)) / (i + 1); // Tối ưu tính toán
  }
  return Math.floor(result);
};
```

### Giải thích từng phần

#### 1. Base Cases

```javascript
if (k > n || k < 0) return 0;
```

- **k > n:** Không thể chọn 5 phần tử từ 3 phần tử → 0
- **k < 0:** Không có nghĩa toán học → 0

#### 2. Special Cases

```javascript
if (k === 0 || k === n) return 1;
```

- **k = 0:** Chỉ có 1 cách chọn 0 phần tử (không chọn gì)
- **k = n:** Chỉ có 1 cách chọn tất cả

#### 3. Thuật toán tối ưu

```javascript
for (let i = 0; i < k; i++) {
  result = (result * (n - i)) / (i + 1);
}
```

**Thay vì tính:** n!/(k!×(n-k)!) (có thể overflow)

**Ta tính:** (n × (n-1) × ... × (n-k+1)) / (1 × 2 × ... × k)

---

## 🔍 Tại sao thuật toán này hiệu quả?

### Vấn đề với công thức gốc

**Công thức gốc:** C(5,2) = 5!/(2!×3!) = 120/(2×6) = 120/12 = 10

**Vấn đề:**

- Tính 5! = 120 (số lớn, có thể overflow)
- Phải tính 3 giai thừa riêng biệt

### Cách tối ưu

**Rút gọn:** C(5,2) = (5×4)/(1×2) = 20/2 = 10

**Ưu điểm:**

- Không cần tính giai thừa đầy đủ
- Tránh overflow với số lớn
- Chia dần trong quá trình tính

### Minh họa step-by-step

**Tính C(5,2):**

```
Bước đầu: result = 1

i=0: result = (1 × (5-0)) / (0+1) = (1 × 5) / 1 = 5
i=1: result = (5 × (5-1)) / (1+1) = (5 × 4) / 2 = 10

Kết quả: C(5,2) = 10
```

**Tính C(7,3):**

```
Bước đầu: result = 1

i=0: result = (1 × (7-0)) / (0+1) = (1 × 7) / 1 = 7
i=1: result = (7 × (7-1)) / (1+1) = (7 × 6) / 2 = 21
i=2: result = (21 × (7-2)) / (2+1) = (21 × 5) / 3 = 35

Kết quả: C(7,3) = 35
```

---

## PRACTICAL

### Liên quan đến bài chia kẹo

Thay vì dùng thuật ngữ star and bar, thế nó bằng mấy viên kẹo với mấy thằng nhóc. Giống với bài [Chia kẹo cho mấy thằng nhóc](https://github.com/thai-ho/algo/blob/95054ae46035db89800e7380839e9746976c55f2/leetcode/daily/2929-Distribute-Candies-Among-Children-II) của leetcode

### Visualization

**Ví dụ:** n=5 viên kẹo cho 3 đứa

```
★★★|★|★     → Đứa 1: 3, Đứa 2: 1, Đứa 3: 1
★★|★★|★     → Đứa 1: 2, Đứa 2: 2, Đứa 3: 1
★|★★★|★     → Đứa 1: 1, Đứa 2: 3, Đứa 3: 1
|★★★★★|     → Đứa 1: 0, Đứa 2: 5, Đứa 3: 0
```

### Công thức

**Để phân phối n vật giống nhau cho k người:**

```
Số cách = C(n + k - 1, k - 1) = C(n + k - 1, n)
```

**Cho bài toán kẹo (k=3):**

```
Số cách = C(n + 3 - 1, 3 - 1) = C(n + 2, 2)
```

### Giải thích trực quan

1. **n** Số viên kẹo
2. **(k-1)** chia thành k nhóm
3. **Tổng vị trí:** n + (k-1) = n + k - 1
4. **Chọn vị trí cho thanh ngăn:** C(n+k-1, k-1)

---

## 🔢 Test cases và validation

### Kiểm tra tính đúng đắn

```javascript
// Test với các trường hợp đặc biệt
console.log("=== Test Cases ===");
console.log("C(5,0) =", combination(5, 0)); // Expected: 1
console.log("C(5,5) =", combination(5, 5)); // Expected: 1
console.log("C(5,6) =", combination(5, 6)); // Expected: 0
console.log("C(5,-1) =", combination(5, -1)); // Expected: 0

// Test với các giá trị thông thường
console.log("C(5,2) =", combination(5, 2)); // Expected: 10
console.log("C(7,3) =", combination(7, 3)); // Expected: 35
console.log("C(10,4) =", combination(10, 4)); // Expected: 210

// Verification bằng công thức gốc
function factorialCombination(n, k) {
  if (k > n || k < 0) return 0;
  if (k === 0 || k === n) return 1;

  const factorial = (num) => {
    let result = 1;
    for (let i = 1; i <= num; i++) result *= i;
    return result;
  };

  return factorial(n) / (factorial(k) * factorial(n - k));
}

console.log("=== Verification ===");
console.log("Optimized C(7,3) =", combination(7, 3));
console.log("Factorial C(7,3) =", factorialCombination(7, 3));
```

---

## ⚡ Performance comparison

### Tại sao thuật toán tối ưu tốt hơn?

| Phương pháp   | Time Complexity | Space Complexity | Overflow Risk       |
| ------------- | --------------- | ---------------- | ------------------- |
| **Factorial** | O(n)            | O(1)             | **Cao** (n! lớn)    |
| **Optimized** | O(min(k, n-k))  | O(1)             | **Thấp** (chia dần) |

### Ví dụ với số lớn

**C(100, 3) với factorial:**

- Phải tính 100! = số khổng lồ
- Rất dễ overflow

**C(100, 3) với optimized:**

- Chỉ tính: (100 × 99 × 98) / (1 × 2 × 3) = 161,700
- Không overflow, tính nhanh
