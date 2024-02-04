import React, {useEffect, useState} from "react";
import Square from "./Square";
import Player from "./Player";
import Leaderboard from "./Leaderboard";
import { useCookies } from "react-cookie";
const URL = "https://tictactoe-backend-blss.onrender.com/api/games";

const Board = () => {
    const [state, setState] = useState(Array(9).fill(null));
    const [currentPlayer, setCurrentPlayer] = useState(true);
    const [winner, setWinner] = useState('');
    const [cookies, setCookie] = useCookies(['player1', 'player2', 'player1Name', 'player2Name']);
    const [games, setGames] = useState();

    let player1Score = cookies["player1"] || 0;
    let player2Score = cookies["player2"] || 0;
    let player1Name = cookies['player1Name'];
    let player2Name = cookies['player2Name'];

    useEffect(() => {
        setCookie('player1', player1Score);
        setCookie('player2', player2Score);
    }, [player1Score, player2Score, setCookie]);

    const checkNames = () => {
        if (!player1Name || !player2Name) {
            const n1 = prompt("Enter Player 1's name:");
            const n2 = prompt("Enter Player 2's name:");
            setCookie('player1Name', n1 || 'Player 1');
            setCookie('player2Name', n2 || 'Player 2');
            player1Name = cookies['player1Name'];
            player2Name = cookies['player2Name'];
        }
    };

    useEffect(() => {
        getGames();
        checkNames();
    }, []);

    const checkWinner = () => {
        console.log('Called checkWinner');
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
                setWinner(player1Name);
                setCookie("player1", player1Score + 1);
            } else if (result === 'O') {
                setWinner(player2Name);
                setCookie("player2", player2Score + 1);
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
    const reGame = () => {
        setCurrentPlayer(true);
        setState(Array(9).fill(null));
        setWinner('');
    }

    const getGames = async () => {
        try {
            // Fetch all games details
            const response = await fetch(URL, {
                method: "GET",
                headers: {
                    "Content-Type":"application/json"
                }
            })
            if(response.ok){
                const data = await response.json();
                setGames(data.data);
            }else{
                console.log("Something went wrong at get method");
            }
        } catch (error) {
            console.log(error);
        }
    }

    const reset = async () => {
        if(player1Score !== 0 || player2Score !== 0){
            // Store the data to database
            try {
                const game = {
                    player1: player1Name,
                    player2: player2Name,
                    winner: player1Score>player2Score?player1Name:(player2Score>player1Score?player2Name:"Tie"),
                    score1: player1Score,
                    score2: player2Score
                }
                const response = await fetch(URL, {
                    method: "POST",
                    headers: {
                        "Content-Type":"application/json"
                    },
                    body: JSON.stringify(game)
                });
                if(response.ok){
                    alert("Data saved successfully");
                    console.log("Data saved successfully");
                }else{
                    alert("Something went wrong");
                    console.log("Something went wrong at post method");
                }
            } catch (error) {
                console.log(error);
            }
        }

        getGames();

        setCookie('player1', 0)
        setCookie('player2', 0)
        player1Name = '';
        player2Name = '';
        checkNames();
        reGame();
    }
    return (
        winner?
        <div className="default">
            <button onClick={reset}>Reset</button>
            <h1 style={{'color':'rgb(244, 235, 223)'}}>{winner} Won!!</h1>
            <button onClick={reGame}>Play Again</button>
        </div>
        :
        <div className="outside-box">
            <div className="container">
                <Player name={player1Name} score={player1Score}/>
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
                <Player name={player2Name} score={player2Score}/>
            </div>
            <button onClick={reset}>Reset</button>
            <Leaderboard value={games}/>
        </div>
    )
}
export default Board;