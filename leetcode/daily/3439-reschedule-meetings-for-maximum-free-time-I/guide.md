**Problem**:
Cho số nguyên `eventTime` là khoảng thời gian của 1 event diễn ra, `eventTime` sẽ bắt đầu từ `t = 0` đến `t = eventTime`.
Cho 2 chuỗi số nguyên `startTime` và `endTime`, có độ dài `n`, thể hiện việc các meetings sẽ ko overlap lên nhau. Meeting `index` occurs during the time `[startTime[index], endTime[index]]`.

Có thể sắp xếp lại lịch đối với `k` meeting bằng cách di chuyển thời gian start, đồng thời giữ nguyên khoảng thời gian `eventTime`, cách này để maximize các meetings có thể diễn ra ở freetime.

Trả về kết quả của maximum amount of free time possible

**Example**:

- Example 1:
  Input: eventTime = 5, k = 1, startTime = [1,3], endTime = [2,5]
  Output: 2

Explanation:
Reschedule the meeting at [1, 2] to [2, 3], leaving no meetings during the time [0, 2].

- Example 2:
  Input: eventTime = 10, k = 1, startTime = [0,2,9], endTime = [1,4,10]
  Output: 6

Explanation:
Reschedule the meeting at [2, 4] to [1, 3], leaving no meetings during the time [3, 9].

- Example 3:
  Input: eventTime = 5, k = 2, startTime = [0,1,2,3,4], endTime = [1,2,3,4,5]
  Output: 0

Explanation:
There is no time during the event not occupied by meetings.

**Approach**:
Sử dụng **Sliding Window** với ý tưởng:

1. **Sắp xếp** các meetings theo thời gian bắt đầu
2. **Sliding window**: Thử tất cả các cách chọn một dãy meetings liên tiếp để giữ lại
3. **Loại bỏ** tối đa `k` meetings (những meetings ngoài window)
4. **Tính thời gian trống** với các meetings được giữ lại:
   - Thời gian trước meeting đầu tiên: `meetings[0].start - 0`
   - Thời gian giữa các meetings: `meetings[i].start - meetings[i-1].end`
   - Thời gian sau meeting cuối: `eventTime - meetings[last].end`
5. **Lấy maximum** của tất cả các trường hợp

**📊 Ví dụ minh hoạ**

### 🔄 Vòng lặp chính:

```js
for (let left = 0; left <= n; left++) {
    for (let right = left; right <= n; right++) {
```

Mục đích: Thử tất cả các subarray liên tiếp có thể có

### 📊 Ví dụ cụ thể với [meetings = [[0,1], [2,4], [9,10]]](http://vscodecontentref/0) (n=3):

```js
Index:    0      1      2
Meeting: [0,1]  [2,4]  [9,10]
```

Tất cả các trường hợp (left, right):

| left | right | slice(left,right) | keepMeetings         | removeMeetings |
| ---- | ----- | ----------------- | -------------------- | -------------- |
| 0    | 0     | slice(0,0)        | []                   | 3              |
| 0    | 1     | slice(0,1)        | [[0,1]]              | 2              |
| 0    | 2     | slice(0,2)        | [[0,1],[2,4]]        | 1              |
| 0    | 3     | slice(0,3)        | [[0,1],[2,4],[9,10]] | 0              |
| 1    | 1     | slice(1,1)        | []                   | 3              |
| 1    | 2     | slice(1,2)        | [[2,4]]              | 2              |
| 1    | 3     | slice(1,3)        | [[2,4],[9,10]]       | 1              |
| 2    | 2     | slice(2,2)        | []                   | 3              |
| 2    | 3     | slice(2,3)        | [[9,10]]             | 2              |
| 3    | 3     | slice(3,3)        | []                   | 3              |

### 🎯 Với k=1, chỉ xét những trường hợp removeMeetings ≤ 1:

| Case  | keepMeetings         | removeMeetings | Ý nghĩa                        |
| ----- | -------------------- | -------------- | ------------------------------ |
| (0,2) | [[0,1],[2,4]]        | 1              | Giữ 2 meeting đầu, loại [9,10] |
| (0,3) | [[0,1],[2,4],[9,10]] | 0              | Giữ tất cả meetings            |
| (1,3) | [[2,4],[9,10]]       | 1              | Giữ 2 meeting cuối, loại [0,1] |

### 🔍 Tính Free Time cho từng case:

Case 1: keepMeetings = [[0,1],[2,4]]

```js
Timeline: 0=1-2===4----------10
          M1  M2
```

- Trước M1: (0-0) = 0
- Giữa M1,M2: (2-1) = 1
- Sau M2: (10-4) = 6
- Total: 0 + 1 + 6 = 7

Case 2: keepMeetings = [[0,1],[2,4],[9,10]]

```js
Timeline: 0=1-2===4-----9=10
        M1  M2      M3
```

- Trước M1: (0-0) = 0
- Giữa M1,M2: (2-1) = 1
- Giữa M2,M3: (9-4) = 5
- Sau M3: (10-10) = 0
- Total: 0 + 1 + 5 + 0 = 6

Case 3: keepMeetings = [[2,4],[9,10]]

```js
Timeline: 0---2===4-----9=10
              M2      M3
```

- Trước M2: (2-0) = 2
- Giữa M2,M3: (9-4) = 5
- Sau M3: (10-10) = 0
- Total: 2 + 5 + 0 = 7

### 🏆 Kết quả:

- Case 1: 7 ✅
- Case 2: 6
- Case 3: 7 ✅

Maximum = 7

### 💡 Tại sao cần 2 vòng lặp?

1. left: Điểm bắt đầu của subarray
2. right: Điểm kết thúc của subarray (exclusive)
3. slice(left,right): Tạo ra subarray từ index left đến right-1

**Solution**:

```javascript
var maxFreeTime = function (eventTime, k, startTime, endTime) {
  const n = startTime.length;

  // Tạo array chứa các meetings [start, end]
  const meetings = [];
  for (let i = 0; i < n; i++) {
    meetings.push([startTime[i], endTime[i]]);
  }

  // Sắp xếp meetings theo thời gian bắt đầu
  meetings.sort((a, b) => a[0] - b[0]);

  let maxFree = 0;

  // Sliding window: thử tất cả các cách chọn meetings liên tiếp
  for (let left = 0; left <= n; left++) {
    for (let right = left; right <= n; right++) {
      const keepMeetings = meetings.slice(left, right);
      const removeMeetings = n - keepMeetings.length;

      // Nếu số meetings cần remove > k thì skip
      if (removeMeetings > k) continue;

      // Tính thời gian trống với các meetings được giữ lại
      let freeTime = 0;
      let currentTime = 0;

      // Thời gian trống trước meeting đầu tiên
      if (keepMeetings.length > 0) {
        freeTime += keepMeetings[0][0] - currentTime;
        currentTime = keepMeetings[0][1];
      }

      // Thời gian trống giữa các meetings
      for (let i = 1; i < keepMeetings.length; i++) {
        if (keepMeetings[i][0] > currentTime) {
          freeTime += keepMeetings[i][0] - currentTime;
        }
        currentTime = Math.max(currentTime, keepMeetings[i][1]);
      }

      // Thời gian trống sau meeting cuối cùng
      if (keepMeetings.length === 0) {
        freeTime = eventTime;
      } else {
        freeTime += eventTime - currentTime;
      }

      maxFree = Math.max(maxFree, freeTime);
    }
  }

  return maxFree;
};
```

**Complexity**:

- **Time Complexity**: O(n³) - nested loops O(n²) và slice/tính toán O(n)
- **Space Complexity**: O(n) - lưu meetings array
