import {
  Panel,
  PanelHeader,
  PanelHeaderContent,
  PanelHeaderBack,
} from "@vkontakte/vkui";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import io from "socket.io-client";

const Dreamcatcher = ({ id, close, getToken, openErrorWs }) => {
  const config = useSelector((s) => s.config);
  const user = useSelector((s) => s.user);
  const [gameData, setGameData] = useState({});
  const dispatch = useDispatch();
  const [token, setToken] = useState(null);
  const socket = io(config.ws_url, {
    path: "/server/websocket",
    autoConnect: false,
    transports: ["polling", "websocket"],
    reconnection: false,
    query: {
      access_token: token,
    },
  });
  const [startConnection, setStartConnection] = useState(false);

  const initGame = async () => {
    const access = await getToken("dreamcatcher");
    setToken(access);
  };

  const socket_event = (ws) => {
    ws.on("connect", () => {
      console.log("nice");
      dispatch({
        type: "updatePopout",
        payload: {
          id: "game",
          name: null,
        },
      });
    });
    ws.on("disconnect", (c) => {
      openErrorWs(c, "dreamcatcher");
    });
    ws.on("request", async (c) => {
      console.log(c);
      if (c.status === false) {
        dispatch({
          type: "setErrorData",
          payload: c.response ? c.response : {},
        });
        socket.close();
      }
    });
  };

  useEffect(() => {
    if (token !== null) {
      if (!startConnection) {
        setStartConnection(true);
        socket.connect();
        socket_event(socket);
      }
    }
    if (token === null) {
      initGame();
    }
  }, [token, startConnection]);

  return (
    <Panel id={id}>
      <PanelHeader separator={false}>
        <PanelHeaderContent
          before={
            <PanelHeaderBack
              hasHover={false}
              onClick={() => {
                socket.close();
                close();
              }}
            />
          }
        >
          Dream Catcher
        </PanelHeaderContent>
      </PanelHeader>
    </Panel>
  );
};

export default Dreamcatcher;
