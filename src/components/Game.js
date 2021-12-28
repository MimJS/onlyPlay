import React from 'react'

const Game = ({gameName, onlineCount, className}) => {
    return (
         <div className={`block--game ${className}`}>
          <div className="bg">
            <div className="online">
                {onlineCount}
                <div className={`blob ${onlineCount>0 && "green"}`}/>
            </div>
          </div>
          <div className="name">{gameName}</div>
        </div>
    )
}

export default Game
