// Determine if a 9 x 9 Sudoku board is valid. Only the filled cells need to be validated according to the following rules:

// Each row must contain the digits 1-9 without repetition.
// Each column must contain the digits 1-9 without repetition.
// Each of the nine 3 x 3 sub-boxes of the grid must contain the digits 1-9 without repetition.
// Note:

// A Sudoku board (partially filled) could be valid but is not necessarily solvable.
// Only the filled cells need to be validated according to the mentioned rules.

// Example 1:

// Input: board =
// [["5","3",".",".","7",".",".",".","."]
// ,["6",".",".","1","9","5",".",".","."]
// ,[".","9","8",".",".",".",".","6","."]
// ,["8",".",".",".","6",".",".",".","3"]
// ,["4",".",".","8",".","3",".",".","1"]
// ,["7",".",".",".","2",".",".",".","6"]
// ,[".","6",".",".",".",".","2","8","."]
// ,[".",".",".","4","1","9",".",".","5"]
// ,[".",".",".",".","8",".",".","7","9"]]
// Output: true
// Example 2:

// Input: board =
// [["8","3",".",".","7",".",".",".","."]
// ,["6",".",".","1","9","5",".",".","."]
// ,[".","9","8",".",".",".",".","6","."]
// ,["8",".",".",".","6",".",".",".","3"]
// ,["4",".",".","8",".","3",".",".","1"]
// ,["7",".",".",".","2",".",".",".","6"]
// ,[".","6",".",".",".",".","2","8","."]
// ,[".",".",".","4","1","9",".",".","5"]
// ,[".",".",".",".","8",".",".","7","9"]]
// Output: false
// Explanation: Same as Example 1, except with the 5 in the top left corner being modified to 8. Since there are two 8's in the top left 3x3 sub-box, it is invalid.

// Constraints:

// board.length == 9
// board[i].length == 9
// board[i][j] is a digit 1-9 or '.'.

/**
 * @param {character[][]} board
 * @return {boolean}
 */

const checkValidDuplicates = (arr) => {
  const set = new Set();
  for (let i = 0; i < arr.length; i++) {
    let cur = Number(arr[i]);
    if (set.has(cur)) return false;

    if (!isNaN(cur)) set.add(cur);
  }
  return true;
};

var isValidSudoku = function (board) {
  let horizontals = board;

  const isHorizontalValid = horizontals.every(checkValidDuplicates);
  console.log("isHorizontalValid", isHorizontalValid);

  // check verticals
  let verticals = Array(9)
    .fill()
    .map(() => Array(9).fill());
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      verticals[j][i] = board[i][j];
    }
  }
  const isVerticalValid = verticals.every(checkValidDuplicates);
  console.log("isVerticalValid", isVerticalValid);

  // check 3x3
  let squares = Array(9)
    .fill()
    .map(() => []);
  for (let boxRow = 0; boxRow < 3; boxRow++) {
    for (let boxCol = 0; boxCol < 3; boxCol++) {
      // Calculate the current 3x3 box index (0-8)
      const boxIndex = boxRow * 3 + boxCol;

      // Iterate through each cell in the current 3x3 box
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          // Calculate the actual board position
          const row = boxRow * 3 + i;
          const col = boxCol * 3 + j;

          // Add this value to the appropriate square array
          squares[boxIndex].push(board[row][col]);
        }
      }
    }
  }

  const isSquareValid = squares.every(checkValidDuplicates);
  console.log("isSquareValid", isSquareValid);

  return isHorizontalValid && isVerticalValid && isSquareValid;
};
