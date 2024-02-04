import Game from "./Game";

const heading = {
    player1: "First Player",
    player2: "Second Player",
    winner: "Winner",
    score1: "First Player Score",
    score2: "Second Player Score"
}

const Leaderboard = (props) => {
    if (!props.value || !Array.isArray(props.value)) {
        return null;
    }
    return(
        <div className="leaderboard-container">
            <h1> Games log </h1>
            <table className="table-container">
                <thead>
                    <tr>
                        <th> Rank </th>
                        <th> First Player </th>
                        <th> First Player Score </th>
                        <th> Second Player </th>
                        <th> Second Player Score </th>
                        <th> Winner </th>
                        <th> Date </th>
                    </tr>
                </thead>
                <tbody>
                    {props.value.map((item, index) => (
                        <Game key={index} index={index} data={item} />
                    ))}
                </tbody>
            </table>            
        </div>
    )
}

export default Leaderboard;