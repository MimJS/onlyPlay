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
      <div className="panel--in game--l ist">
        <Game gameName="Double dice" onlineCount={1} className="game--doubleDice"/>
        <Game gameName="Dice" onlineCount={96} className="game--dice"/>
        <Game gameName="Dream Catcher" onlineCount={1} className="game--dreamCatcher"/>
        <Game gameName="Blackjack" onlineCount={1} className="game--blackjack"/>
        <Game gameName="Tower" onlineCount={1} className="game--tower"/>
        <Game gameName="Keno" onlineCount={1} className="game--keno"/>
        <Game gameName="Под 7 над" onlineCount={1} className="game--b7m"/>
        <Game gameName="Dicewheel" onlineCount={1} className="game--dicewheel"/> 
        <Game gameName="Thimble" onlineCount={1} className="game--thimble"/>
      </div>
    </Panel>
  );
};

export default Games;
