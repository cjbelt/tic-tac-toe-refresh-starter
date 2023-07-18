const Screen = require("./screen");
const Cursor = require("./cursor");

class TTT {

  constructor() {

    this.playerTurn = "O";

    this.grid = [[' ',' ',' '],
                 [' ',' ',' '],
                 [' ',' ',' ']]

    this.cursor = new Cursor(3, 3);

    // Initialize a 3x3 tic-tac-toe grid
    Screen.initialize(3, 3);
    Screen.setGridlines(true);

    // Replace this with real commands
    Screen.addCommand('up', 'moves the cursor up', this.cursor.up);
    Screen.addCommand('down', 'moves the cursor down', this.cursor.down);
    Screen.addCommand('left', 'moves the cursor to the left', this.cursor.left);
    Screen.addCommand('right', 'moves the cursor to the right', this.cursor.right);
    Screen.addCommand('return', "places a move in the cursor's position", this.placeMove);

    Screen.render();
  }

  static checkWin(grid) {
    let total = 0;
    const declareWinner = function(X, O) {
      if (X === 3) {
        return "X";
      } else if (O === 3) {
        return "O";
      } else {
        return false;
      }
    }

    const countMoves = function(i, j, values = {
      X: 0,
      O: 0
    }) {
       if (grid[i][j] === "X") {
        values.X++;
        total++;
      } else if (grid[i][j] === "O") {
        values.O++;
        total++;
      }

      return values;
    }

    // horizontal checking
    for (let i = 0; i < grid.length; i++) {
      let values = {
        X: 0,
        O: 0
      }
      for (let j = 0; j < grid[i].length; j++) {
        values = countMoves(i, j, values);
      }
      if (declareWinner(values.X, values.O)) {
        return declareWinner(values.X, values.O);
      }
    // Return 'X' if player X wins
    // Return 'O' if player O wins
    // Return 'T' if the game is a tie
    // Return false if the game has not ended

      // check tie
      if (total === grid.length * grid[0].length) {
        return "T";
      }
    }

    // vertical checking
    for (let j = 0; j < grid[0].length; j++) {
      let values = {
        X: 0,
        O: 0
      }
      for (let i = 0; i < grid.length; i++) {
        values = countMoves(i, j, values);
      }

      if (declareWinner(values.X, values.O)) {
        return declareWinner(values.X, values.O);
      }
    }

    // diagonal checking
    let values = {
      X: 0,
      O: 0,
    }
    let j = grid[0].length - 1;

    for (let i = 0; i < grid.length; i++) {
      values = countMoves(i, i, values);
    }

    if (declareWinner(values.X, values.O)) {
      return declareWinner(values.X, values.O);
    }

    values.X = 0;
    values.O = 0;

    for (let i = 0; i < grid.length; i++) {
     values = countMoves(i, j, values);

      j--;
    }

    if (declareWinner(values.X, values.O)) {
      return declareWinner(values.X, values.O);
    }

    return false;
  }

  placeMove = () => {
    Screen.setTextColor(this.cursor.row, this.cursor.col, "white");
    Screen.setGrid(this.cursor.row, this.cursor.col, this.playerTurn);
    if (TTT.checkWin(Screen.grid)) {
      TTT.endGame(TTT.checkWin(Screen.grid));
    };
    Screen.render();
  }

  static endGame(winner) {
    if (winner === 'O' || winner === 'X') {
      Screen.setMessage(`Player ${winner} wins!`);
    } else if (winner === 'T') {
      Screen.setMessage(`Tie game!`);
    } else {
      Screen.setMessage(`Game Over`);
    }
    Screen.render();
    Screen.quit();
  }

}

module.exports = TTT;
