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
Chưa biết

**Solution**:

```javascript
/**
 * @param {number} eventTime
 * @param {number} k
 * @param {number[]} startTime
 * @param {number[]} endTime
 * @return {number}
 */
var maxFreeTime = function (eventTime, k, startTime, endTime) {};
```

**Complexity**:
