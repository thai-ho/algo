# JavaScript For Loops

## 1. `for` - Classic Loop
```javascript
for (let i = 0; i < 5; i++) {
  console.log(i); // 0, 1, 2, 3, 4
}
```

## 2. `for...in` - Object Keys/Array Indices
```javascript
const obj = {a: 1, b: 2};
for (let key in obj) {
  console.log(key); // "a", "b"
}

const arr = [10, 20];
for (let index in arr) {
  console.log(index); // "0", "1" (strings)
}
```

## 3. `for...of` - Iterable Values
```javascript
const arr = [10, 20, 30];
for (let value of arr) {
  console.log(value); // 10, 20, 30
}

const str = "abc";
for (let char of str) {
  console.log(char); // "a", "b", "c"
}
```

## 4. `forEach` - Array Method
```javascript
[1, 2, 3].forEach((value, index) => {
  console.log(value, index); // 1 0, 2 1, 3 2
});
```

## 5. `while` - Condition Loop
```javascript
let i = 0;
while (i < 3) {
  console.log(i++); // 0, 1, 2
}
```

## 6. `do...while` - Execute First, Then Check
```javascript
let i = 0;
do {
  console.log(i++); // 0, 1, 2
} while (i < 3);
```

## Quick Reference
- **`for`**: Classic counter loop
- **`for...in`**: Object keys/array indices (strings)
- **`for...of`**: Iterable values
- **`forEach`**: Array method with callback
- **`while`**: Condition-based loop
- **`do...while`**: Execute once, then check condition