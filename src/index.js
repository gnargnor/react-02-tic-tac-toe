import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

/**Square - Stateless functional component that makes up the game squares */
function Square(props) {
    /** @return square component with @prop value and @prop click handler */
    return (
        <button className="square" onClick={props.onClick}>
            {props.value}
        </button>
    );
}

/** Board - Class representing the game board */
class Board extends React.Component {
    /**
     * @constructor Manages the state of the square values, keeps track of whether X or O is up next.
     * @param {*} props 
     */
    constructor(props){
        super(props);
    }
    /**
     * @method renders square component class
     * @param {number} i - square number
     * @return Square element
     */
    renderSquare(i) {
        return (
            <Square
                value={this.props.squares[i]} 
                onClick={() => this.props.onClick(i)}
            />
        );
    }

    render() {
        /** @return status & game board */
        return (
            <div>
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
    constructor(){
        super();
        /**
         * @prop 
         * @param {array} history - contains the history of the value of game squares - 'X', 'O', null
         * @param {bool} xIsNext - determines which value plays next
         */
        this.state={
            history: [{
                squares: Array(9).fill(null),
            }],
            xIsNext: true,
        };
    }

    /**
     * @method handles square click event
     * @param {*} i 
     */
    handleClick(i) {
        //* copies the squares array for immutability */
        const history = this.state.history;
        const current = history[history.length - 1];
        const squares = current.squares.slice();
        if (calculateWinner(squares) || squares[i]) {
            return;
        }
        squares[i] = this.state.xIsNext ? 'X' : 'O';
        //sets this.state.squares equal to the array that was just copied
        this.setState({
            history: history.concat([{
                squares: squares,
            }]),            
            xIsNext: !this.state.xIsNext,
        });
    }

    render() {
        const history = this.state.history;
        const current = history[history.length - 1];
        /** calls helper function to determine game status */
        const winner = calculateWinner(current.squares);

        const moves = history.map((step, move) => {
            const desc = move ? 'Move #' + move : 'Game start';
            return (
                <li>
                    <a href="#" onClick={() => this.jumpTo(move)}>{desc}</a>
                </li>
            );
        });

        let status;
        if (winner){
            status = 'THE WINNER IS: ' + winner;
        } else {
            status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
        }

        return (
            //sets up the game and divides the DOM into a div for the board and a div for the game-info
            <div className="game">
                <div className="game-board">
                    <Board 
                        squares={current.squares}
                        onClick={(i) => this.handleClick(i)}
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

//=====

ReactDOM.render(
    <Game />,
    document.getElementById('root')
);

//helper function - hoisted where it needs to be
function calculateWinner(squares){
    //all possible winning combos
    const lines = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6],
    ];
    //cycle through combos to determine if there is a winner - if there is a 3 in a row match, return the value of the winner - X or O
    for (let i = 0; i < lines.length; i++) {
        const [a,b,c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
    //otherwise keep playing
    return null;
}