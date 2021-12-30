import { Panel, PanelHeader, PanelHeaderContent } from "@vkontakte/vkui";
import { Icon28GameOutline } from "@vkontakte/icons";
import Game from "../../components/Game";

const Games = ({ id, openGame }) => {
  return (
    <Panel id={id}>
      <PanelHeader separator={false}>
        <PanelHeaderContent before={<Icon28GameOutline />}>
          Игры
        </PanelHeaderContent>
      </PanelHeader>
      <div className="panel--in game--list">
        <Game
          gameName="Thimble"
          onlineCount={552}
          className="game--thimble"
          onClick={() => openGame("thimble")}
        />
        <Game
          gameName="Dream Catcher"
          onlineCount={829}
          className="game--dreamCatcher"
        />
        <Game
          gameName="Double dice"
          onlineCount={489}
          className="game--doubleDice"
        />
        <Game gameName="Dice" onlineCount={96} className="game--dice" />
        <Game
          gameName="Blackjack"
          onlineCount={0}
          className="game--blackjack"
        />
        <Game gameName="Tower" onlineCount={5} className="game--tower" />
        <Game gameName="Keno" onlineCount={0} className="game--keno" />
        <Game gameName="Под 7 над" onlineCount={69} className="game--b7m" />
        <Game
          gameName="Dicewheel"
          onlineCount={234}
          className="game--dicewheel"
        />
      </div>
    </Panel>
  );
};

export default Games;
