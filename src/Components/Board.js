import React from 'react'
import { calculateWinner } from '../util'
import Square from './Square'
import Users from './Users'
class Board extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            squares: Array(9).fill(null),
            isNext: true,
            player1: '',
            player2: '',
            started: false,
        };
        this.getNames = this.getNames.bind(this);
    }
    handleClick(i) {
        const squares = this.state.squares.slice();
        if (calculateWinner(squares) || squares[i]) {
            return;
        }
        squares[i] = this.state.isNext ? 'X' : 'O';
        this.setState({
            squares: squares,
            isNext: !this.state.isNext,
        })
    }
    renderSquare(i) {
        return <Square
            value={this.state.squares[i]}
            onClick={() => this.handleClick(i)}
        />;
    }
    getNames(player1, player2) {
        this.setState({ player1: player1, player2: player2, started: true })
    }
    onReset(){
       this.setState({
        squares: Array(9).fill(null),
        isNext: true,
       }) 
    }
    render() {
        const winner = calculateWinner(this.state.squares);
        let status;
        if (winner) {
            status = "Winner: " + (winner === 'X' ? this.state.player1 : this.state.player2);
        } else {
            status = "Next player: " + (this.state.isNext ? this.state.player1 : this.state.player2)
        }
        return (
            <div>
                {!this.state.started ?
                    <Users submitNames={this.getNames} /> :
                    <>
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
                        <br />
                        <input type="button" onClick={() => this.onReset()} value='Reset' />
                    </>}

            </div>
        );
    }
}

export default Board;