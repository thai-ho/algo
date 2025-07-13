/**
 * @param {number[]} players
 * @param {number[]} trainers
 * @return {number}
 */
var matchPlayersAndTrainers = function (players, trainers) {
  // Sắp xếp cả hai mảng tăng dần
  const sortedPlayers = [...players].sort((a, b) => a - b);
  const sortedTrainers = [...trainers].sort((a, b) => a - b);

  let i = 0,
    j = 0,
    matches = 0;

  // Two pointers approach
  while (i < sortedPlayers.length && j < sortedTrainers.length) {
    if (sortedPlayers[i] <= sortedTrainers[j]) {
      // Match found
      matches++;
      i++;
      j++;
    } else {
      // Current trainer không đủ mạnh, thử trainer tiếp theo
      j++;
    }
  }

  return matches;
};

console.log(
  "players = [4,7,9], trainers = [8,2,5,8]",
  matchPlayersAndTrainers([4, 7, 9], [8, 2, 5, 8])
);
