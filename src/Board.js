import React from "react";
import Square from "./Square";

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(9).fill(null),
      isNextX: true,
      winnerFinal: false,
    };
  }
  stateHandler = (i) => {
    if (!this.state.squares[i] && !this.state.winnerFinal) {
      const squares = this.state.squares.slice();
      squares[i] = this.state.isNextX ? "X" : "O";
      this.setState({ squares: squares, isNextX: !this.state.isNextX });
    }
  };
  winnerHandler = () => {
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
        this.state.squares[a] &&
        this.state.squares[a] === this.state.squares[b] &&
        this.state.squares[a] === this.state.squares[c]
      ) {
        return this.state.squares[a];
      }
    }
    return null;
  };
  renderSquare(i) {
    return (
      <Square
        value={this.state.squares[i]}
        onClick={() => this.stateHandler(i)}
      />
    );
  }

  render() {
    const winner = this.winnerHandler();
    if (winner && !this.state.winnerFinal) {
      this.setState({
        winnerFinal: true,
      });
    }
    let status = "Next player: " + (this.state.isNextX ? "X" : "O");
    if (winner) {
      status = "Winner is " + winner;
    }
    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}
export default Board;
