**Problem**:
Cho một mảng số nguyên bắt đầu từ 0 là `players`, trong đó `players[i]` biểu thị năng lực của người chơi thứ i. Bạn cũng được cho một mảng số nguyên có chỉ số bắt đầu từ 0 là `trainers`, trong đó `trainers[j]` biểu thị khả năng huấn luyện của huấn luyện viên thứ j.

Người chơi thứ i có thể ghép với huấn luyện viên thứ j nếu năng lực của người chơi nhỏ hơn hoặc bằng khả năng huấn luyện của huấn luyện viên đó. Ngoài ra, mỗi người chơi chỉ được ghép với tối đa một huấn luyện viên, và mỗi huấn luyện viên cũng chỉ được ghép với tối đa một người chơi.

Yêu cầu: Trả về số lượng ghép tối đa giữa người chơi và huấn luyện viên thỏa mãn các điều kiện trên

**Example**:

### Example 1:

Input: players = [4,7,9], trainers = [8,2,5,8]
Output: 2
Explanation:
One of the ways we can form two matchings is as follows:

- players[0] can be matched with trainers[0] since 4 <= 8.
- players[1] can be matched with trainers[3] since 7 <= 8.
  It can be proven that 2 is the maximum number of matchings that can be formed.

### Example 2:

Input: players = [1,1,1], trainers = [10]
Output: 1
Explanation:
The trainer can be matched with any of the 3 players.
Each player can only be matched with one trainer, so the maximum answer is 1.

**Approach**:
Áp dụng `Greedy`, thuật toán tham lam
Sort cả 2 array
Dùng `2 pointers` cho players và trainers
nếu match thì matches++, cả i++ và j++ >< ko match thì j++, kiếm trainer khác phù hợp hơn
Cho tới khi hết cả 2 array thì return matches

**Solution**:

```js
/**
 * @param {number[]} players
 * @param {number[]} trainers
 * @return {number}
 */
var matchPlayersAndTrainers = function (players, trainers) {
  const sortedPlayers = [...players].sort((a, b) => a - b);
  const sortedTrainers = [...trainers].sort((a, b) => a - b);

  let i = 0,
    j = 0,
    matches = 0;

  while (i < sortedPlayers.length && j < sortedTrainers.length) {
    if (sortedPlayers[i] <= sortedTrainers[j]) {
      matches++;
      i++;
      j++;
    } else {
      j++;
    }
  }

  return matches;
};
```

**Complexity**:

- **Time Complexity**: O(n log n + m log m) - do việc sắp xếp cả hai mảng, trong đó n = players.length, m = trainers.length
- **Space Complexity**: O(n + m) - tạo bản sao của cả hai mảng để sắp xếp
