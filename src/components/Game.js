import React from 'react'

const Game = ({gameName, onlineCount, className, onClick}) => {
    return (
         <div className={`block--game ${className}`} onClick={onClick}>
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
