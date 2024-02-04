import React, {useEffect, useState} from "react";
import Square from "./Square";
import Player from "./Player";
const Board = () => {
    const [state, setState] = useState(Array(9).fill(null));
    const [currentPlayer, setCurrentPlayer] = useState(true);
    const [player1, setPlayer1] = useState(0);
    const [player2, setPlayer2] = useState(0);
    const [winner, setWinner] = useState('');
    const name1 = "Gautam", name2 = "Agarwal";
    const checkWinner = () => {
        const winnerLogic = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6]
        ]
        for(let logic of winnerLogic){
            const [a, b, c] = logic;
            if(state[a] !== null && state[a] === state[b] && state[a] === state[c]){
                return state[a];
            }
        }
        let nullCnt = 0;
        for(let i=0;i<9;i++){
            if(state[i] === null) nullCnt++;
        }
        if(nullCnt === 0){
            return "Nobody";
        }
        return false;
    }
    useEffect(() => {
        const result = checkWinner();
        if (result) {
            if (result === 'X') {
                setPlayer1(player1 + 1);
                setWinner('Player 1 (X)');
            } else if (result === 'O') {
                setPlayer2(player2 + 1);
                setWinner('Player 2 (O)');
            } else {
                setWinner('Nobody');
            }
        }
    }, [state]);
    
    const handleClick = (index) => {
        if(state[index] !== null) return;
        const copyState = [...state]
        copyState[index] = currentPlayer?'X':'O';
        setCurrentPlayer(!currentPlayer)
        setState(copyState)
    }
    const reset = () => {
        setCurrentPlayer(true);
        setState(Array(9).fill(null));
        setWinner('');
        setPlayer1(player1);
        setPlayer2(player2);
    }
    return (
        winner?
        <div className="default">
            <h1 style={{'color':'rgb(244, 235, 223)'}}>{winner} Won!!</h1>
            <button onClick={reset}>Play Again</button>
        </div>
        :
        <div className="container">
            <Player name={name1} score={player1}/>
            <div className="board">
                <h4 style={{
                    'display':'flex',
                    'justifyContent':'center',
                    'fontSize':'x-large'
                }}>Current Turn : {currentPlayer?'X':'O'}</h4>
                <div className="board-row">
                    <Square onClick={() => handleClick(0)} value={state[0]}/>
                    <Square onClick={() => handleClick(1)} value={state[1]}/>
                    <Square onClick={() => handleClick(2)} value={state[2]}/>
                </div>
                <div className="board-row">
                    <Square onClick={() => handleClick(3)} value={state[3]}/>
                    <Square onClick={() => handleClick(4)} value={state[4]}/>
                    <Square onClick={() => handleClick(5)} value={state[5]}/>
                </div>
                <div className="board-row">
                    <Square onClick={() => handleClick(6)} value={state[6]}/>
                    <Square onClick={() => handleClick(7)} value={state[7]}/>
                    <Square onClick={() => handleClick(8)} value={state[8]}/>
                </div>
            </div>
            <Player name={name2} score={player2}/>
        </div>
    )
}
export default Board;