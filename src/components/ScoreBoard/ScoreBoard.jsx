import React from 'react';
import "./scoreboard.css";

const ScoreBoard = ({scoreX, scoreO}) => (
    <div className="scoreBoard">
        <div>{scoreX}</div>
        <div>{scoreO}</div>
    </div>
)

export default ScoreBoard