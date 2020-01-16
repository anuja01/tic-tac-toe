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
            errors: {},
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
        let errors = []
        !player1 && (errors['player1Error'] = 'Please enter player 1');
        !player2 && (errors['player2Error'] = 'Please enter player 2');
        (player1 && player2) ?
            this.setState({
                player1: player1,
                player2: player2,
                errors: '',
                started: true
            }) :
            this.setState({ errors: errors })
    }
    onReset() {
        this.setState({
            squares: Array(9).fill(null),
            isNext: true,
        })
    }
    goBack() {
        this.setState({
            squares: Array(9).fill(null),
            isNext: true,
            started: false,
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
                    <Users submitNames={this.getNames} errors={this.state.errors} /> :
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
                        <input type="button" name="goback" value="Go Back" width="1000px" onClick={() => this.goBack()} />
                    </>}

            </div>
        );
    }
}

export default Board;