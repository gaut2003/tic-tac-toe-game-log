import React from "react";

const Player = (props) => {
    return (
        <div className="player">
            <h1 className="player-style"> Name : {props.name}</h1>
            <h2 className="player-style" style={{'marginTop':'0px'}}> Score : {props.score}</h2>
        </div>
    )
}

export default Player;