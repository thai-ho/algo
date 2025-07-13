/**
 * @param {number} eventTime
 * @param {number} k
 * @param {number[]} startTime
 * @param {number[]} endTime
 * @return {number}
 */
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
  
  // Dùng sliding window để tìm khoảng thời gian trống lớn nhất
  // Với mỗi window, ta sẽ giữ lại các meetings trong window
  // và loại bỏ k meetings ngoài window
  
  // Thử tất cả các window có thể có
  for (let left = 0; left <= n; left++) {
    for (let right = left; right <= n; right++) {
      // Window từ left đến right (không bao gồm right)
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

// Test cases
console.log(maxFreeTime(5, 1, [1,3], [2,5])); // Expected: 2
console.log(maxFreeTime(10, 1, [0,2,9], [1,4,10])); // Expected: 6  
console.log(maxFreeTime(5, 2, [0,1,2,3,4], [1,2,3,4,5])); // Expected: 0
