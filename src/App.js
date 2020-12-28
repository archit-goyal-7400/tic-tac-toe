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
      currentIndex: 0,
    };
  }
  stateHandler = (i) => {
    if (
      !this.state.history[this.state.currentIndex].squares[i] &&
      !this.winnerHandler(this.state.history[this.state.currentIndex].squares)
    ) {
      const history = this.state.history.slice(0, this.state.currentIndex + 1);
      const square = this.state.history[
        this.state.currentIndex
      ].squares.slice();
      square[i] = this.state.isNextX ? "X" : "O";
      history.push({ squares: square });
      this.setState({
        history: history,
        isNextX: history.length % 2,
        currentIndex: history.length - 1,
      });
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
  jumpTo = (index) => {
    this.setState({
      currentIndex: index,
      isNextX: index % 2 === 0,
    });
  };
  render() {
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
          <button onClick={() => this.jumpTo(i)}>
            {i ? "Move to #" + i : "Move to start"}
          </button>
        </li>
      );
    });
    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={this.state.history[this.state.currentIndex].squares}
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
