import React from 'react';
import { Router, Route, Link, browserHistory, IndexRoute  } from 'react-router'


class Game extends React.Component {

  constructor() {
    super();
    this.state={
      won: null,
      turn: true,
      stepNumber: 0,
      history: [{squares: Array(9).fill(null)}]
    }
  }

  handleClick(i) {
    const history=this.state.history;
    const current = history[history.length-1];
    const squares = current.squares.slice();
    if(calculateWinner(squares) || squares[i])
    {
      let winner=calculateWinner(squares);
      if(winner)
      {
        this.setState({won: winner});
      }
      return ;
    }
    squares[i] =  this.state.turn? 'X' : 'O';
    this.setState({turn: !this.state.turn, stepNumber: history.length})
    this.setState({history: history.concat([{
      squares: squares
    }])});
  }

  jumpTo(step) {
  this.setState({
    stepNumber: step,
    turn: (step % 2) ? false : true,
  });
}


  render() {
    const history=this.state.history;
    const current = history[this.state.stepNumber];;

    const moves = history.map((step, move) => {
  const desc = move ?
    'Move #' + move :
    'Game start';
  return (
    <li>
      <a key={move} href="#" onClick={() => this.jumpTo(move)}>{desc}</a>
    </li>
  );
});


    return(<div>
      <h1>Tic Tac Toe Game</h1>
      <h3>Player {this.state.won? this.state.won+' won': (this.state.turn? 'X' : 'O')+' Chance'} </h3>
      <Board onClick={(i)=> this.handleClick(i)} squares={current.squares}/>
      <ol>{moves}</ol>
      <button onClick={() => this.setState({history: [{squares: Array(9).fill(null)}], turn: true, won: null, stepNumber: 0})}>Reset</button>
      </div>);
    }
  }

  class Board extends React.Component {




    renderSquare(i)
    {
      return <Square value={this.props.squares[i]} onClick={() => this.props.onClick(i)}/>;
    }

    render() {
      return (<div>

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

        </div>);
      }
    }

    class Square extends React.Component {
      render()
      {
        return (<button className="square" onClick={() => this.props.onClick()} >{this.props.value} </button>);
      }
    }


function calculateWinner(squares) {
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
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

    export default Game;
