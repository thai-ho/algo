**Problem**:

Cho chuỗi integer, lucky number sẽ là số có giá trị bằng với số lượng của nó trong array.

Trả về lucky number có giá trị lớn nhất trong chuỗi.

**Example**:

- Example 1:

Input: arr = [2,2,3,4]
Output: 2
Explanation: Lucky number bằng 2 vì: frequency[2] == 2.

- Example 2:

Input: arr = [1,2,2,3,3,3]
Output: 3
Explanation: 1, 2 and 3 đều là lucky numbers, trả về số lớn nhất.

- Example 3:

Input: arr = [2,2,2,3,3]
Output: -1
Explanation: Không có lucky number trong đây vì, frequency[2] == 3 và frequency[3] == 2.

**Approach**:
Tạo object đếm frequency của từng số trong chuỗi.
Vào object check số lượng lucky numbers match với 2 điều kiện sau đây:

- number == frequency
- number lớn hơn lucky number, cho trường hợp có nhiều lucky number trong chuỗi

**Solution**:

```javascript
var findLucky = function (arr) {
  let luckyNumber = -1;
  let frequencyMap = {}; // {number: frequency}

  // Tổng hợp lại bằng object các số kèm frequency
  arr.forEach((number) => {
    if (frequencyMap[number]) frequencyMap[number] += 1;
    else frequencyMap[number] = 1;
  });

  for (let number in frequencyMap) {
    let frequency = frequencyMap[number]; // cho nay number la key cua object
    console.log("Checking number", number, "with frequency", frequency);

    // neu number = frequency => la lucky number
    if (parseInt(number) == frequency) {
      if (parseInt(number) > luckyNumber) {
        // condition nay co 2 nhiem vu,
        // override initial lucky num la -1
        // va tiep tuc override khi co lucky num lon hon
        luckyNumber = parseInt(number);
      }
    }
  }

  return luckyNumber;
};
```

**Complexity**:

- **Time Complexity**: O(n)

  - First loop: O(n) to count frequency of each number
  - Second loop: O(k) where k is the number of unique numbers in the array
  - Since k ≤ n, overall time complexity is O(n)

- **Space Complexity**: O(k)

  - We use a frequencyMap object to store k unique numbers
  - In worst case, k = n (all numbers are unique), so O(n)
  - In best case, k = 1 (all numbers are the same), so O(1)
