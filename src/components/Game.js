import React from "react";
import { Icon12User } from "@vkontakte/icons";

const Game = ({ gameName, onlineCount, className, onClick }) => {
  return (
    <div className={`block--game ${className}`} onClick={onClick}>
      <div className="bg">
        <div className="online">
          <Icon12User width={11} height={11} />
          {onlineCount}
          {/* <div className={`blob ${onlineCount > 0 && "green"}`} /> */}
        </div>
      </div>
      {/*<div className="name">{gameName}</div>*/}
    </div>
  );
};

export default Game;
