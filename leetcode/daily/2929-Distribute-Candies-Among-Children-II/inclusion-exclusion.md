# Nguyên lý Inclusion-Exclusion (Bao hàm - Loại trừ)

## 🎯 Công thức cốt lõi

```
|A ∪ B ∪ C| = |A| + |B| + |C| - |A ∩ B| - |A ∩ C| - |B ∩ C| + |A ∩ B ∩ C|
```

**Ý nghĩa:** Tính số phần tử thuộc ít nhất 1 trong 3 tập hợp A, B, C

## 🔍 Vấn đề cốt lõi: Tránh đếm trùng lặp

### Bước 1: Cộng tất cả |A| + |B| + |C|

**Vấn đề:** Chúng ta sẽ đếm trùng các phần tử thuộc nhiều tập hợp!

**Ví dụ:**

- Phần tử chỉ thuộc A → đếm 1 lần ✅
- Phần tử thuộc A và B → đếm 2 lần ❌ (thừa 1)
- Phần tử thuộc cả A, B, C → đếm 3 lần ❌ (thừa 2)

### Bước 2: Trừ đi các giao |A ∩ B| - |A ∩ C| - |B ∩ C|

**Mục đích:** Sửa lỗi đếm trùng ở bước 1

**Kết quả:**

- Phần tử thuộc A và B → 2 - 1 = 1 lần ✅
- Phần tử thuộc cả A, B, C → 3 - 3 = 0 lần ❌ (bị trừ quá!)

**Vấn đề mới:** Phần A ∩ B ∩ C bị trừ quá nhiều (từ 3 xuống 0)!

### Bước 3: Cộng lại |A ∩ B ∩ C|

**Mục đích:** Sửa lỗi bị trừ quá nhiều ở bước 2

**Kết quả:**

- Phần tử thuộc cả A, B, C → 0 + 1 = 1 lần ✅

**🎉 Hoàn hảo:** Mọi phần tử đều được đếm đúng 1 lần!

---

## 📊 Ví dụ cụ thể với bài toán kẹo

### Định nghĩa các tập hợp

**Cho n=8, limit=2**

- **A:** Trường hợp đứa 1 nhận > 2 viên (≥ 3 viên)
- **B:** Trường hợp đứa 2 nhận > 2 viên (≥ 3 viên)
- **C:** Trường hợp đứa 3 nhận > 2 viên (≥ 3 viên)

### Bảng tóm tắt quá trình

| Bước        | Công thức                           | Ý nghĩa                       | Trạng thái đếm       |
| ----------- | ----------------------------------- | ----------------------------- | -------------------- |
| 1. Cộng đơn | \|A\| + \|B\| + \|C\|               | Đếm tất cả trường hợp vi phạm | **Đếm trùng nhiều!** |
| 2. Trừ đôi  | - \|A ∩ B\| - \|A ∩ C\| - \|B ∩ C\| | Bỏ đi phần đếm trùng đôi      | **Trừ quá phần ba!** |
| 3. Cộng ba  | + \|A ∩ B ∩ C\|                     | Sửa lại phần bị trừ quá       | **Hoàn hảo! ✅**     |

---

## 🔢 Tính toán chi tiết

### Ví dụ: n=8, limit=2

**Tổng cách phân phối:** C(8+2, 2) = C(10, 2) = 45

**Tính từng thành phần:**

- **|A|:** Đứa 1 ≥ 3 viên → C(8-3+2, 2) = C(7, 2) = 21
- **|B|:** Đứa 2 ≥ 3 viên → C(7, 2) = 21
- **|C|:** Đứa 3 ≥ 3 viên → C(7, 2) = 21
- **|A ∩ B|:** Đứa 1,2 đều ≥ 3 viên → C(8-6+2, 2) = C(4, 2) = 6
- **|A ∩ C|:** Đứa 1,3 đều ≥ 3 viên → C(4, 2) = 6
- **|B ∩ C|:** Đứa 2,3 đều ≥ 3 viên → C(4, 2) = 6
- **|A ∩ B ∩ C|:** Cả 3 đều ≥ 3 viên → C(8-9+2, 2) = C(1, 2) = 0

**Áp dụng công thức:**

```
Số vi phạm = 21 + 21 + 21 - 6 - 6 - 6 + 0 = 45
```

**Kết quả:** 45 - 45 = 0

_Có nghĩa là không có cách nào phân phối 8 viên kẹo mà mỗi đứa ≤ 2 viên!_

---

## 💡 Tại sao không thể dùng cách đơn giản "tổng - từng case"?

### Vấn đề với cách tiếp cận naive

**Ý tưởng sai:** Tổng - |A| - |B| - |C|

**Vấn đề:** Các case không độc lập!

- Case "đứa 1 vi phạm" có thể chồng chéo với "đứa 2 vi phạm"
- Nếu chỉ trừ đơn giản, ta sẽ trừ thiếu hoặc trừ thừa

### Ví dụ minh họa

Giả sử có 1 cách phân phối mà cả đứa 1 và đứa 2 đều vi phạm:

- **Cách sai:** Trừ 2 lần (một lần cho đứa 1, một lần cho đứa 2)
- **Cách đúng:** Chỉ trừ 1 lần (vì chỉ là 1 cách phân phối duy nhất)

**Inclusion-exclusion đảm bảo:** Mỗi trường hợp được đếm đúng 1 lần, không hơn không kém!

---

## 🚀 Tối ưu cho bài toán kẹo

### Base cases thông minh

```javascript
if (n > limit * 3) return 0; // Không thể phân phối
if (n == limit * 3) return 1; // Chỉ có 1 cách: (limit, limit, limit)
```

### Loại bỏ case không cần thiết

**Nhận xét:** Với base cases trên, case123 (cả 3 đứa đều vi phạm) luôn = 0

**Lý do:**

- case123 > 0 khi n ≥ 3×(limit+1) = 3×limit + 3
- Nhưng base case đã loại n > 3×limit
- Vì 3×limit + 3 > 3×limit, nên case123 không bao giờ được tính

### Code tối ưu cuối cùng

```javascript
var distributeCandies = function (n, limit) {
  const combination = (n, k) => {
    if (k > n || k < 0) return 0;
    if (k === 0 || k === n) return 1;
    let result = 1;
    for (let i = 0; i < k; i++) {
      result = (result * (n - i)) / (i + 1);
    }
    return Math.floor(result);
  };

  // Base cases tối ưu
  if (n > limit * 3) return 0;
  if (n == limit * 3) return 1;

  // Tổng số cách phân phối (không giới hạn)
  let totalWays = combination(n + 2, 2);

  // Các trường hợp vi phạm đơn lẻ
  let case1 = (case2 = case3 = 0);
  if (n - limit - 1 >= 0) {
    case1 = case2 = case3 = combination(n - limit - 1 + 2, 2);
  }

  // Các trường hợp vi phạm đôi
  let case12 = (case13 = case23 = 0);
  if (n - 2 * (limit + 1) >= 0) {
    case12 = case13 = case23 = combination(n - 2 * (limit + 1) + 2, 2);
  }

  // case123 luôn = 0 (đã được chứng minh)
  let case123 = 0;

  // Áp dụng inclusion-exclusion
  let invalidWays = case1 + case2 + case3 - case12 - case13 - case23 + case123;

  return totalWays - invalidWays;
};
```

---

## 🎯 Tóm tắt

**Inclusion-exclusion principle** giải quyết vấn đề đếm trùng lặp một cách có hệ thống:

1. **Cộng tất cả** → Đếm trùng
2. **Trừ các giao đôi** → Sửa lỗi đếm trùng, nhưng tạo ra lỗi mới
3. **Cộng giao ba** → Sửa lỗi mới

**Kết quả:** Mỗi phần tử được đếm chính xác 1 lần!

**Ứng dụng:** Đặc biệt hữu ích khi các điều kiện loại trừ có thể chồng chéo lên nhau.
