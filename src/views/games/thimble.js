import {
  Panel,
  PanelHeader,
  PanelHeaderContent,
  PanelHeaderBack,
} from "@vkontakte/vkui";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { io } from "socket.io-client";

const Thimble = ({ id, close, getToken, openErrorWs }) => {
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
    const access = await getToken("thimbles");
    setToken(access);
  };

  const initWs = async () => {
    setStartConnection(true);
    socket.connect();
    socket_event(socket);
    window.closeWs = function () {
      socket.disconnect();
    };
  };

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
      }
    });
  };

  useEffect(() => {
    if (token !== null) {
      if (!startConnection) {
        initWs();
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
    </Panel>
  );
};

export default Thimble;
