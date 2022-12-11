function createPlayer(name, symbol) {
    return {
      name: name,
      symbol: symbol,
      score: 0,
    };
  }

const player1 = createPlayer("Alice", "X");
const player2 = createPlayer("Bob", "O");

