import { Panel, PanelHeader, PanelHeaderContent } from "@vkontakte/vkui";
import { Icon28GameOutline } from "@vkontakte/icons";
import Game from "../../components/Game";
import { useSelector } from "react-redux";

const Games = ({ id, openGame }) => {
  const online = useSelector((s) => s.config.globalData.gamesOnline);
  return (
    <Panel id={id}>
      <PanelHeader separator={false}>
        <PanelHeaderContent before={<Icon28GameOutline />}>
          Игры
        </PanelHeaderContent>
      </PanelHeader>
      <div className="panel--in game--list">
        <Game
          onlineCount={552}
          className="game--coinflip"
          onClick={() => openGame("coinflip")}
        />
        <Game onlineCount={0} className="game--dice" />
        <Game onlineCount={0} className="game--crash" />
        <Game onlineCount={0} className="game--hilo" />
        <Game onlineCount={0} className="game--tower" />
        <Game onlineCount={0} className="game--keno" />
        <Game onlineCount={0} className="game--roulette" />
        <Game onlineCount={0} className="game--ninja" />
        <Game onlineCount={0} className="game--wheel" />
      </div>
    </Panel>
  );
};

export default Games;
