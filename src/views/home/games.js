import { Panel, PanelHeader, PanelHeaderContent } from "@vkontakte/vkui";
import { Icon28GameOutline } from "@vkontakte/icons";
import online from "../../img/online.png";

const OnlinePulse = () => {
  return (
    <div class="blob green"></div> 
  );
};

const Games = ({ id, openGame }) => {
  return (
    <Panel id={id}>
      <PanelHeader separator={false}>
        <PanelHeaderContent before={<Icon28GameOutline />}>
          Игры
        </PanelHeaderContent>
      </PanelHeader>
      <div className="panel--in game--list">
        <div className="block--game game--ninja">
          <div className="bg">
            <div className="online">1 <OnlinePulse/> {/*<img src={online} />*/}</div>
          </div>
          <div className="name">ninja</div>
        </div>
        <div className="block--game game--dice">
          <div className="bg">
            <div className="online">96 <OnlinePulse/> {/*<img src={online} />*/}</div>
          </div>
          <div className="name">dice</div>
        </div>
        <div className="block--game game--dreamCatcher">
          <div className="bg">
            <div className="online">25 <OnlinePulse/> {/*<img src={online} />*/}</div>
          </div>
          <div className="name">dream catcher</div>
        </div>
        <div
          className="block--game game--tower"
          onClick={() => openGame("tower")}
        >
          <div className="bg">
            <div className="online">8 <OnlinePulse/> {/*<img src={online} />*/}</div>
          </div>
          <div className="name">tower</div>
        </div>
        <div className="block--game game--keno">
          <div className="bg">
            <div className="online">465 <OnlinePulse/> {/*<img src={online} />*/}</div>
          </div>
          <div className="name">keno</div>
        </div>
        <div className="block--game game--b7m">
          <div className="bg">
            <div className="online">3 <OnlinePulse/> {/*<img src={online} />*/}</div>
          </div>
          <div className="name">Под 7 над</div>
        </div>
        <div className="block--game game--dicewheel">
          <div className="bg">
            <div className="online">78 <OnlinePulse/> {/*<img src={online} />*/}</div>
          </div>
          <div className="name">dicewheel</div>
        </div>
        <div className="block--game game--thimble">
          <div className="bg">
            <div className="online">913  <OnlinePulse/> {/*<img src={online} />*/}</div>
          </div>
          <div className="name">thimble</div>
        </div>
      </div>
    </Panel>
  );
};

export default Games;
