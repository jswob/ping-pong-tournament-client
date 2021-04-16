export default function (server) {
  const numberOfPlayers = 10;
  const numberOfGames = 200;

  const players = server.createList('player', numberOfPlayers);

  for (let gameIndex = 0; gameIndex < numberOfGames; gameIndex++) {
    const player1Index = getRandomInteger(0, numberOfPlayers - 1);

    let player2Index;

    do {
      player2Index = getRandomInteger(0, numberOfPlayers - 1);
    } while (player1Index === player2Index);

    server.create('game', {
      players: [players[player1Index], players[player2Index]],
      winner: getRandomInteger(0, 1)
        ? players[player1Index]
        : players[player2Index],
    });
  }
}

function getRandomInteger(min, max) {
  return Math.round(Math.random() * (max - min)) + min;
}
