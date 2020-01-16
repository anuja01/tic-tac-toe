import React from 'react';

const Users = (props) => {
    return (
        <>
            <h1>Enter player names below</h1>
            <form onSubmit={(e) => { props.submitNames(e.target.player1.value, e.target.player2.value); e.preventDefault(); }}>
                <label>
                    <h3>Player 1: </h3>
                    <input type="text" name="player1" />
                </label>
                <label style={{ marginLeft: '10px', color: 'red' }}>{props.errors['player1Error']}</label>
                <label>
                    <h3>Player 2: </h3>
                    <input type="text" name="player2" />
                </label>
                <label style={{ marginLeft: '10px', color: 'red' }}>{props.errors['player2Error']}</label>
                <br />
                <br />
                <input type="submit" name="submit" value="Submit" width="1000px" />
            </form>
        </>
    )
}
export default Users;