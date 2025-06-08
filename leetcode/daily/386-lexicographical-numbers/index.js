/**
 * @param {number} n
 * @return {number[]}
 */

// Cách chỉ để giải, ko thoả điều kiện 2 của đề bài

var lexicalOrder = function (n) {
  const arr = [];
  for (let i = 1; i <= n; i++) {
    arr.push(i);
  }

  return arr.sort();
};

// Cách thoả cả 2 điều kiện - DFS approach
var lexicalOrderOptimal = function (n) {
  const result = [];
  
  // Helper function để duyệt DFS
  function dfs(current) {
    if (current > n) return;
    
    result.push(current);
    
    // Duyệt các số con (thêm digit 0-9 vào cuối)
    for (let i = 0; i <= 9; i++) {
      const next = current * 10 + i;
      if (next > n) break;
      dfs(next);
    }
  }
  
  // Bắt đầu từ các số 1-9
  for (let i = 1; i <= 9; i++) {
    if (i > n) break;
    dfs(i);
  }
  
  return result;
};

// Cách 3: Iterative approach - Thực sự O(1) space
var lexicalOrderIterative = function (n) {
  const result = [];
  let current = 1;
  
  for (let i = 0; i < n; i++) {
    result.push(current);
    
    // Thử nhân 10 (đi sâu hơn)
    if (current * 10 <= n) {
      current *= 10;
    } 
    // Nếu không thể đi sâu, thử tăng lên
    else {
      // Nếu current kết thúc bằng 9 hoặc current + 1 > n
      // thì phải backtrack
      while (current % 10 === 9 || current + 1 > n) {
        current = Math.floor(current / 10);
      }
      current++;
    }
  }
  
  return result;
};

// Test function
function testLexicalOrder() {
  console.log("Test n=13:", lexicalOrderIterative(13));
  console.log("Test n=2:", lexicalOrderIterative(2));
}

// testLexicalOrder();