import React from "react";
import Board from "./Board";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [
        {
          squares: Array(9).fill(null),
        },
      ],
      isNextX: true,
    };
  }
  stateHandler = (i) => {
    if (
      !this.state.history[this.state.history.length - 1].squares[i] &&
      !this.winnerHandler(
        this.state.history[this.state.history.length - 1].squares
      )
    ) {
      const history = [...this.state.history];
      const square = this.state.history[
        this.state.history.length - 1
      ].squares.slice();
      square[i] = this.state.isNextX ? "X" : "O";
      history.push({ squares: square });
      this.setState({ history: history, isNextX: !this.state.isNextX });
    }
  };
  winnerHandler = (squares) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return squares[a];
      }
    }
    return null;
  };
  render() {
    console.log(this.state.history);
    const winner = this.winnerHandler(
      this.state.history[this.state.history.length - 1].squares
    );
    let status = "Next player: " + (this.state.isNextX ? "X" : "O");
    if (winner) {
      status = "Winner is " + winner;
    }
    const moves = this.state.history.map((sq, i) => {
      return (
        <li key={i}>
          <button>{i ? "Move to #" + i : "Move to start"}</button>
        </li>
      );
    });
    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={this.state.history[this.state.history.length - 1].squares}
            isNextX={this.state.isNextX}
            stateHandler={(i) => this.stateHandler(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

export default App;
