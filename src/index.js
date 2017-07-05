import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

//stateless functional component - makes code easier to read and will be optimized by react in the future
function Square(props) {
    //displays the value passed by the renderSquare(i) method of the Board component
    return (
        <button className="square" onClick={props.onClick}>
            {props.value}
        </button>
    );
}


class Board extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            squares: Array(9).fill(null),
            xIsNext: true,
        };
    }

    //defines renderSquare as a method that returns the Square component that takes in the argument as its value prop
    renderSquare(i) {
        //changes in response to the value of the square in position i in this.state.squares array
        return (
            <Square
                value={this.state.squares[i]} 
                onClick={() => this.handleClick(i)}
            />
        );
    }

    handleClick(i){
        //makes a copy of the this.state.squares array - this makes the function immutable and expands the options for what we can do with it
        const squares = this.state.squares.slice();
        //sets the local copy of the squares array equal to X for now
        squares[i] = this.state.xIsNext ? 'X' : 'O';
        //sets this.state.squares equal to the array that was just copied
        this.setState({
            squares:squares,
            xIsNext: !this.state.xIsNext}
        );
    }

    render() {        
        const status = 'Next player: X';

        //sets up the game board by rendering squares with the renderSquare(i) method defined above
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

class Game extends React.Component {
    render() {
        return (
            //sets up the game and divides the DOM into a div for the board and a div for the game-info
            <div className="game">
                <div className="game-board">
                    <Board />
                </div>
                <div className="game-info">
                    <div>{}</div>
                    <div>{}</div>
                </div>
            </div>
        );
    }
}

//=====

ReactDOM.render(
    <Game />,
    document.getElementById('root')
);