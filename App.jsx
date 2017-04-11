import React from 'react';
import { Router, Route, Link, browserHistory, IndexRoute  } from 'react-router'


class Game extends React.Component {

  constructor() {
    super();
  }


  render() {
    return(<div>
      <h1>Tic Tac Toe Game</h1>

      <Board/>
      </div>);
    }
  }

  class Board extends React.Component {

    constructor()
    {
      super();
      this.state={
        won: null,
        turn: true,
        squares: Array(9).fill(null)
      }
    }

    handleClick(i) {
      const squares = this.state.squares.slice();
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
      this.setState({turn: !this.state.turn})
      this.setState({squares: squares});
    }


    renderSquare(i)
    {
      return <Square value={this.state.squares[i]} onClick={() => this.handleClick(i)}/>;
    }

    render() {
      return (<div>
        <h3>Player {this.state.won? this.state.won+' won': (this.state.turn? 'X' : 'O')+' Chance'} </h3>
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
        <button onClick={() => this.setState({squares: [], turn: true, won: null})}>Reset</button>
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
