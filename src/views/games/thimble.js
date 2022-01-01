import {
  Panel,
  PanelHeader,
  PanelHeaderContent,
  PanelHeaderBack,
  Button,
  Input,
  SimpleCell,
  Avatar,
  FormStatus,
  FormItem,
} from "@vkontakte/vkui";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { io } from "socket.io-client";
import { number_format } from "../../lib/util";
import { ReactComponent as Vkc } from "../../svg/vkc.svg";
import { Icon56DiamondOutline } from "@vkontakte/icons";
import { Icon24DoneOutline } from "@vkontakte/icons";
import thimbleGray from "../../img/thimble-grey.png";
import thimbleRed from "../../img/thimble-red.png";
import thimbleCoins from "../../img/thimble-coins.png";

const Thimble = ({ id, close, getToken, openErrorWs }) => {
  const config = useSelector((s) => s.config);
  const user = useSelector((s) => s.user);
  const [gameData, setGameData] = useState({});
  const [inGame, setInGame] = useState(false);
  const [isResult, setIsResult] = useState(false);
  const [gameResult, setGameResult] = useState({});
  const [betError, setBetError] = useState(null);
  const dispatch = useDispatch();
  const [token, setToken] = useState(null);
  const [sum, setSum] = useState(null);
  const [vkData, setVkData] = useState([]);
  const [sortFinish, setSortFinish] = useState(false);
  const socket = io(config.ws_url, {
    path: "/server/websocket.php",
    autoConnect: false,
    transports: ["websocket"],
    reconnection: false,
    query: {
      access_token: token,
    },
  });
  const [startConnection, setStartConnection] = useState(false);

  useEffect(() => {
    const imageList = [thimbleGray, thimbleRed, thimbleCoins];
    imageList.forEach((image) => {
      new Image().src = image;
    });
  }, []);

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
    ws.on("connect_error", (c) => {
      openErrorWs(c, "thimble");
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
      if (c.event == "getError") {
        if (c.status === false) {
          dispatch({
            type: "setErrorData",
            payload: c.response ? c.response : {},
          });
          socket.disconnect(true);
          openErrorWs(c, "thimble");
        }
      } else {
        switch (c.event) {
          case "initGame":
            setGameData(c.response);
            break;
          case "startGame":
            if (c.status == false) {
              setBetError(c.response.error_public);
              return;
            }
            setBetError(null);
            setInGame(true);
            setGameData((prevState) => ({
              ...prevState,
              myGame: { ...gameData.myGame, hash: c.response.myGame.hash },
            }));
            dispatch({
              type: "updateBalance",
              payload: c.response.private.coins,
            });
            break;
          case "updateGame":
            setGameData((prevState) => ({
              ...prevState,
              history: c.response.history,
            }));
            break;
          case "endGame":
            setGameData((prevState) => ({
              ...prevState,
              myGame: { ...gameData.myGame, hash: c.response.newGame.hash },
            }));
            setIsResult(true);
            setGameResult(c.response);
            dispatch({
              type: "updateBalance",
              payload: c.response.private.coins,
            });
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
          path: "/server/websocket.php",
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

  const chooseThimble = (id) => {
    if (isResult == true || inGame == false) {
      return;
    }
    window.socket.emit("request", {
      event: "selectThimble",
      value: id,
    });
  };

  const restGame = () => {
    setInGame(false);
    setIsResult(false);
    setGameResult({});
  };

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
              {!inGame && (
                <div className="wait">
                  <Icon56DiamondOutline />
                  <span className="text">Ваша ставка?</span>
                </div>
              )}
              {inGame && (
                <div className={`thimbles ${isResult ? "results" : ""}`}>
                  {[...Array(3)].map((v, i) => (
                    <div
                      className="thimble"
                      onClick={() => chooseThimble(i + 1)}
                    >
                      <img className="tgImage" src={thimbleGray} />
                      <img className="tImage" src={thimbleRed} />
                      <img
                        className={`coins ${
                          Object.keys(gameResult).length > 0 &&
                          gameResult.results.result == i + 1
                            ? "showCoins"
                            : ""
                        }`}
                        src={thimbleCoins}
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
            {!inGame && (
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
                  <FormItem
                    status={betError !== null ? "error" : null}
                    bottom={betError !== null ? betError : null}
                  >
                    <Input
                      placeholder="Ваша ставка"
                      value={sum}
                      onChange={(e) => setSum(e.currentTarget.value)}
                      type="number"
                    />
                    <div className="betButtons">
                      <Button size="m" mode="secondary">
                        /2
                      </Button>
                      <Button size="m" mode="secondary">
                        x2
                      </Button>
                    </div>
                  </FormItem>
                </div>
                <Button
                  className="bet"
                  size="l"
                  before={<Icon24DoneOutline />}
                  stretched
                  onClick={() => {
                    window.socket.emit("request", {
                      event: "startGame",
                      amount: Math.round(sum),
                    });
                    console.log("test");
                  }}
                >
                  Поставить
                </Button>
              </div>
            )}
            {inGame && (
              <>
                {isResult ? (
                  <>
                    {Object.keys(gameResult).length > 0 && (
                      <>
                        {gameResult.results.win ? (
                          <FormStatus header={"Вы выиграли"} mode="positive">
                            <span className="verticalText">
                              {number_format(gameResult.results.win)}
                              <Vkc /> (x2.7)
                            </span>
                          </FormStatus>
                        ) : (
                          <FormStatus header={"Вы проиграли"} mode="error">
                            <span className="verticalText">
                              {number_format(gameResult.results.coins)}
                              <Vkc />
                            </span>
                          </FormStatus>
                        )}
                      </>
                    )}
                    <Button
                      className="continue"
                      onClick={() => restGame()}
                      size="l"
                      stretched
                      before={<Icon24DoneOutline />}
                    >
                      Продолжить
                    </Button>
                  </>
                ) : (
                  <FormStatus header={"Где спрятан приз?"}>
                    Выберите один из пяти стаканчиков
                    <div className="koef">x2.7</div>
                  </FormStatus>
                )}
              </>
            )}
            <div className="hashData">
              {Object.keys(gameResult).length > 0 && isResult == true && (
                <>
                  <span>Hash: {gameResult.results.hash}</span>
                  <span>
                    Check md5:{" "}
                    {gameResult.results.secret +
                      "@" +
                      gameResult.results.result}
                  </span>
                </>
              )}
              {Object.keys(gameResult).length == 0 && isResult == false && (
                <>
                  <span>Hash: {gameData.myGame.hash}</span>
                </>
              )}
            </div>
            {!inGame && (
              <div className="historyList">
                {gameData.history &&
                  gameData.history.map((v, i) => (
                    <SimpleCell
                      key={i}
                      before={<Avatar src={v.photo_100} size={40} />}
                      hasHover={false}
                      hasActive={false}
                      description={
                        <span
                          className={`sum ${
                            v.win ? "plus" : "minus"
                          } verticalText`}
                        >
                          {v.win ? "+" : "-"}{" "}
                          {number_format(v.win ? v.win : v.coins)}
                          <Vkc />
                        </span>
                      }
                      indicator={v.win && <span className="koef">x2.7</span>}
                    >
                      @id{v.id}
                    </SimpleCell>
                  ))}
              </div>
            )}
          </>
        )}
      </div>
    </Panel>
  );
};

export default Thimble;
