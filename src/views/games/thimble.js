import {
  Panel,
  PanelHeader,
  PanelHeaderContent,
  PanelHeaderBack,
  Button,
  Input,
  SimpleCell,
  Avatar,
} from "@vkontakte/vkui";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { io } from "socket.io-client";
import { number_format } from "../../lib/util";
import { ReactComponent as Vkc } from "../../svg/vkc.svg";
import { Icon56DiamondOutline } from "@vkontakte/icons";
import { Icon24DoneOutline } from "@vkontakte/icons";

const Thimble = ({ id, close, getToken, openErrorWs }) => {
  const config = useSelector((s) => s.config);
  const user = useSelector((s) => s.user);
  const [gameData, setGameData] = useState({});
  const dispatch = useDispatch();
  const [token, setToken] = useState(null);
  const socket = io(config.ws_url, {
    path: "/server/websocket",
    autoConnect: false,
    transports: ["websocket"],
    reconnection: false,
    query: {
      access_token: token,
    },
  });
  const [startConnection, setStartConnection] = useState(false);

  const socket_event = (ws) => {
    ws.on("connect", () => {
      console.log("nice");
      console.log(socket);
      console.log(ws);
      dispatch({
        type: "updatePopout",
        payload: {
          id: "game",
          name: null,
        },
      });
    });
    ws.on("disconnect", (c) => {
      if (c === "io client disconnect") {
        return;
      } else {
        openErrorWs(c, "thimble");
      }
    });
    ws.on("request", async (c) => {
      console.log(c);
      if (c.status === false) {
        dispatch({
          type: "setErrorData",
          payload: c.response ? c.response : {},
        });
        socket.disconnect(true);
        openErrorWs(c, "thimble");
      } else {
        switch (c.event) {
          case "initGame":
            setGameData(c.response);
            break;
          default:
            break;
        }
      }
    });
  };

  useEffect(() => {
    if (!startConnection) {
      async function initWs() {
        window.socket = io(config.ws_url, {
          path: "/server/websocket",
          autoConnect: false,
          transports: ["websocket"],
          reconnection: false,
          query: {
            access_token: await getToken("thimbles"),
          },
        });
        setStartConnection(true);
        window.socket.connect();
        socket_event(window.socket);
        window.closeWs = function () {
          window.socket.disconnect();
        };
      }
      initWs();
    }
  }, [startConnection]);

  return (
    <Panel id={id}>
      <PanelHeader separator={false}>
        <PanelHeaderContent
          before={
            <PanelHeaderBack
              hasHover={false}
              onClick={() => {
                try {
                  window.closeWs();

                  close();
                } catch (e) {
                  close();
                }
              }}
            />
          }
        >
          Thimble
        </PanelHeaderContent>
      </PanelHeader>
      <div className="panel--in">
        <div className="balance">
          <span className="balance--in veritcalText">
            {number_format(user.db.coins)}
            <Vkc />
          </span>
        </div>
        {Object.keys(gameData).length !== 0 && (
          <>
            <div className="gameTable">
              <div className="wait">
                <Icon56DiamondOutline />
                <span className="text">Ваша ставка?</span>
              </div>
            </div>
            <div className="betTable">
              <div className="buttonsRow">
                <Button size="m" stretched>
                  +1KK
                </Button>
                <Button size="m" stretched>
                  +5KK
                </Button>
                <Button size="m" stretched>
                  +10KK
                </Button>
                <Button size="m" stretched>
                  +25KK
                </Button>
              </div>
              <div className="inputLayout">
                <Input placeholder="Ваша ставка" />
                <div className="betButtons">
                  <Button size="m" mode="secondary">
                    /2
                  </Button>
                  <Button size="m" mode="secondary">
                    x2
                  </Button>
                </div>
              </div>
              <Button
                className="bet"
                size="l"
                before={<Icon24DoneOutline />}
                stretched
                onClick={() => {
                  window.socket.emit("request", { event: "startGame" });
                  console.log("test");
                }}
              >
                Поставить
              </Button>
            </div>
            <div className="hashData">
              <span>Hash: {gameData.myGame.hash}</span>
            </div>
            <div className="historyList">
              <SimpleCell
                before={<Avatar src={""} size={40} />}
                hasHover={false}
                hasActive={false}
                description={
                  <span className="sum plus verticalText">
                    + {number_format(285000)}<Vkc />
                  </span>
                }
                indicator={
                  <span className="koef">x4.5</span>
                }
              >
                Михаил Матеевский
              </SimpleCell>
              <SimpleCell
                before={<Avatar src={""} size={40} />}
                hasHover={false}
                hasActive={false}
                description={
                  <span className="sum minus verticalText">
                    - {number_format(1852369000)}<Vkc />
                  </span>
                }
                indicator={
                  <span className="koef">x4.5</span>
                }
              >
                Михаил Матеевский
              </SimpleCell>
            </div>
          </>
        )}
      </div>
    </Panel>
  );
};

export default Thimble;
