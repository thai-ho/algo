# Hệ Cơ Số (Numeral System)

[Wiki]("https://en.wikipedia.org/wiki/Numeral_system#:~:text=A%20numeral%20system%20is%20a,symbols%20in%20a%20consistent%20manner.")

## Khái niệm cơ bản

Hệ cơ số `k` sử dụng `k` chữ số khác nhau: từ `0` đến `k-1`

## Các hệ cơ số phổ biến

| Hệ cơ số | Tên gọi       | Chữ số sử dụng               |
| -------- | ------------- | ---------------------------- |
| 2        | Nhị phân      | 0, 1                         |
| 3        | Tam phân      | 0, 1, 2                      |
| 8        | Bát phân      | 0, 1, 2, 3, 4, 5, 6, 7       |
| 10       | Thập phân     | 0, 1, 2, 3, 4, 5, 6, 7, 8, 9 |
| 16       | Thập lục phân | 0-9, A, B, C, D, E, F        |

## Cách chuyển đổi từ hệ k về hệ 10

**Công thức**: `aₙ × k^n + aₙ₋₁ × k^(n-1) + ... + a₁ × k¹ + a₀ × k⁰`

**Ví dụ**:

- `1001₂ = 1×2³ + 0×2² + 0×2¹ + 1×2⁰ = 8 + 0 + 0 + 1 = 9₁₀`
- `121₃ = 1×3² + 2×3¹ + 1×3⁰ = 9 + 6 + 1 = 16₁₀`
- `2A₁₆ = 2×16¹ + 10×16⁰ = 32 + 10 = 42₁₀`

## Cách chuyển đổi từ hệ 10 về hệ k

**Phương pháp**: Chia liên tục cho k, lấy phần dư

**Ví dụ**: Chuyển `25₁₀` sang hệ 2

```
25 ÷ 2 = 12 dư 1
12 ÷ 2 = 6  dư 0
6  ÷ 2 = 3  dư 0
3  ÷ 2 = 1  dư 1
1  ÷ 2 = 0  dư 1
```

Đọc từ dưới lên: `11001₂`

## Ứng dụng

- **Máy tính**: Hệ nhị phân (0, 1)
- **Lập trình**: Hệ thập lục phân cho màu sắc (#FF0000)
- **Thuật toán**: Chuyển đổi giữa các hệ cơ số
