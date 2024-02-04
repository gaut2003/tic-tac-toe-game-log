const Game = (props) => {
    return(
        <tr>
            <td> {props.index+1} </td>
            <td> {props.data.player1} </td>
            <td> {props.data.score1} </td>
            <td> {props.data.player2} </td>
            <td> {props.data.score2} </td>
            <td> {props.data.winner} </td>
            <td> {props.data.createdAt} </td>
        </tr>
    )
}

export default Game;