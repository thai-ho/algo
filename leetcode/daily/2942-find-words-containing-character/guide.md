## Pattern

**Problem**: Trả ra chuỗi gồm vị trí của các từ có chứa letter `x`

**Example**:

- Example 1:

Input: words = ["leet","code"], x = "e"
Output: [0,1]
Explanation: "e" occurs in both words: "leet", and "code". Hence, we return indices 0 and 1.

- Example 2:

Input: words = ["abc","bcd","aaaa","cbc"], x = "a"
Output: [0,2]
Explanation: "a" occurs in "abc", and "aaaa". Hence, we return indices 0 and 2.

- Example 3:

Input: words = ["abc","bcd","aaaa","cbc"], x = "z"
Output: []
Explanation: "z" does not occur in any of the words. Hence, we return an empty array.

**Approach**:

1. Di chuyển qua từng từ trong chuỗi
2. Check có chứa x bằng cách di chuyển từng chữ cái trong từ (`word[i]`)
3. Nếu có thì push `i` vào chuỗi result

**Solution**:

```javascript
var findWordsContaining = function (words, x) {
  const arr = [];
  for (const [index, word] of words.entries()) {
    for (const letter of word) {
      if (letter == x) {
        arr.push(index);
        break;
      }
    }
  }
  return arr;
};
```

**Complexity**:
- Time Complexity: O(n \* m)

n = number of words in the array
m = average length of each word
In worst case, you check every character of every word

- Space Complexity: O(k)

k = number of words containing the character x
You only store the indices of matching words
