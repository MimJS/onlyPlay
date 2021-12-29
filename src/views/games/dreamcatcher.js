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
  const dispatch = useDispatch()
  let socket = null;

  const initGame = async () => {
    const token = await getToken("dreamcatcher");
    socket = io(config.ws_url, {
      path: "/server/websocket",
      autoConnect: false,
      transports: ["polling", "websocket"],
      reconnection:false,
      query: {
        access_token: token,
      },
    });
    socket.connect();
    socket_event(socket);
  };

  const socket_event = (ws) => {
    ws.on("connect", () => {
      console.log("nice");
    });
    ws.on('disconnect', (c) => {
        openErrorWs(c, 'dreamcatcher')
    })
    ws.on("request", async (c) => {
      console.log(c);
      if(c.status === false){
          openErrorWs(c, 'dreamcatcher')
      }
    });
  };

  useEffect(() => {
    if (Object.keys(gameData).length == 0) {
      initGame();
    }
  }, [gameData]);

  return (
    <Panel id={id}>
      <PanelHeader separator={false}>
        <PanelHeaderContent
          before={
            <PanelHeaderBack
              hasHover={false}
              onClick={() => {
                if (socket !== null) {
                  socket.close();
                }
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
