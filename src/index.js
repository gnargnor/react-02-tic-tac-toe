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
    constructor(props){
        super(props);
    }
    /**
     * renders square component class
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
    /** renders game board */
    render() {
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

/** Game class */
class Game extends React.Component {
    constructor(){
        super();
        /**
         * @this game state
         * @param {array} history - contains the history of the value of game squares - 'X', 'O', null
         * @param {bool} xIsNext - determines which value plays next
         * @param {number} stepNumber - keeps track of step
         */
        this.state={
            history: [{
                squares: Array(9).fill(null),
            }],
            stepNumber: 0,
            xIsNext: true,            
        };
    }
    /**
     * jump between steps
     * @param {number} step 
     */
    jumpTo(step) {
        this.setState({
            stepNumber: step,
            xIsNext: (step % 2) === 0,
        })
    }

    /**
     * handles square click event
     * @param {number} i - square number clicked
     */
    handleClick(i) {
        /**
         * local variables
         * @param {array} history - game history at current step
         * @param {array} current - stores current state of squares, value of xIsNext
         * @param {array} squares - copy of the current state of the squares for immutability
         */
        const history = this.state.history.slice(0, this.state.stepNumber +1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();
        if (calculateWinner(squares) || squares[i]) {
            return;
        }
        squares[i] = this.state.xIsNext ? 'X' : 'O';
        this.setState({
            history: history.concat([{
                squares: squares,
            }]),            
            xIsNext: !this.state.xIsNext,
            stepNumber: history.length,
        });
    }
    /**
     * renders game component
     */
    render() {
        /**
         * local variables
         * @param {array} history - game history at current step
         * @param {array} current - stores current state of squares, value of xIsNext
         * @param {string} winner - null or winner ('X' or 'O')
         */
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const winner = calculateWinner(current.squares);

        const moves = history.map((step, move) => {
            const desc = move ? 'Move #' + move : 'Game start';
            return (
                <li key={move}>
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
        /** returns board, status, and moves */
        return (
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

/** Renders game to DOM */
ReactDOM.render(
    <Game />,
    document.getElementById('root')
);

/**
 * determines if there is a winner based on all possible winning combinations- helper function
 * @param {array} squares 
 * @return null or winner ('X' or 'O')
 */
function calculateWinner(squares){
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
    for (let i = 0; i < lines.length; i++) {
        const [a,b,c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
    return null;
}