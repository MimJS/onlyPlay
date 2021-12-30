import {
  ConfigProvider,
  Root,
  AppRoot,
  View,
  AdaptivityProvider,
  ScreenSpinner,
} from "@vkontakte/vkui";
import "@vkontakte/vkui/dist/vkui.css";
import "./styles/index.scss";
import React, { useState, useEffect } from "react";

import MainHome from "./views/home";
import CreateTeam from "./views/createTeam/createTeam";
import Thimble from "./views/games/thimble";
import Transfer from "./views/transfer/transfer";

import bridge from "@vkontakte/vk-bridge";
import axios from "axios";
import { isAndroid } from "react-device-detect";
import { useSelector, useDispatch } from "react-redux";
import background from "./img/bg.jpg";
import balance from "./img/balance.png";
import buy from "./img/buy.png";
import sell from "./img/sell.png";
import transfer from "./img/transfer.jpg";
import stat_today from "./img/stat_today.jpg";
import stat_all from "./img/stat_all.jpg";
import ErrorPanel, { ErrorPanelWs } from "./components/ErrorPanel";

const App = () => {
  const [activeView, setActiveView] = useState("home");
  const [activePanel, setActivePanel] = useState({
    home: "mainhome",
    game: "",
    createTeam: "createTeam",
    transfer: "transfer",
  });

  const config = useSelector((s) => s.config);
  const user = useSelector((s) => s.user);
  const ui = useSelector((s) => s.ui);
  const dispatch = useDispatch();

  const photos = [
    background,
    balance,
    buy,
    sell,
    transfer,
    stat_today,
    stat_all,
  ];

  const openErrorXhr = (e) => {
    dispatch({
      type: "setErrorData",
      payload: e.response && e.response.data ? e.response.data.response : {},
    });
    dispatch({
      type: "setActiveUnder",
      payload: "profile",
    });
    dispatch({
      type: "setErrorType",
      payload: "xhr",
    });
    dispatch({
      type: "setNewDb",
      payload: {},
    });
    setActiveView("error");
  };

  const openErrorWs = (e, gameName) => {
    if (activeView !== "game") {
      return;
    }
    dispatch({
      type: "updatePopout",
      payload: {
        id: 'game',
        name: null,
      },
    });
    dispatch({
      type: "setLastGame",
      payload: gameName,
    });
    dispatch({
      type: "setErrorType",
      payload: "ws",
    });
    setActivePanel({ ...activePanel, game: "errorPanel" });
  };

  const load_photo = (imageList) => {
    imageList.forEach((image) => {
      new Image().src = image;
    });
  };

  const openGame = (name) => {
    dispatch({
      type: "updatePopout",
      payload: {
        id: 'game',
        name: <ScreenSpinner size='medium' />,
      },
    });
    setActiveView("game");
    setActivePanel({ ...activePanel, game: name });
  };

  const reopenGame = (name) => {
    dispatch({
      type: "updatePopout",
      payload: {
        id: 'game',
        name: <ScreenSpinner size='medium' />,
      },
    });
    setActivePanel({ ...activePanel, game: name });
  };

  const openView = (name) => {
    if (activeView !== name) {
      setActiveView(name);
    }
  };

  const closeGame = () => {
    setActiveView("home");
  };

  const updateUser = (vk) => {
    axios
      .post(config.xhr_url, {
        authorization: {
          type: "vk-mini-apps",
          vk: window.location.search,
          userId: String(vk ? vk.id : user.vk.id),
        },
        event: "getUserData",
      })
      .then((r) => {
        let newDb = { ...r.data.response };
        delete newDb.vk;
        delete newDb.global;
        dispatch({
          type: "setNewDb",
          payload: newDb,
        });
        dispatch({
          type: "setGlobalData",
          payload: r.data.response.global,
        });
        dispatch({
          type: "setNewVk",
          payload: r.data.response.vk,
        });
      })
      .catch((e) => {
        openErrorXhr(e);
      });
  };

  useEffect(() => {
    async function getVk() {
      if (Object.keys(user.vk).length === 0) {
        load_photo(photos);
        const vk = await bridge.send("VKWebAppGetUserInfo");
        dispatch({
          type: "setNewVk",
          payload: vk,
        });
        updateUser(vk);
      }
    }
    getVk();
  });

  const getToken = async (name) => {
    return new Promise((res) => {
      axios
        .post(config.xhr_url, {
          authorization: {
            type: "vk-mini-apps",
            vk: window.location.search,
            userId: String(user.vk.id),
          },
          event: "getAccessToken",
          gamemode: name,
        })
        .then((r) => {
          if (r.data.response.access_token) {
            res(r.data.response.access_token);
          }
        })
        .catch((e) => {
          if (activeView == "game") {
            dispatch({
              type: "updatePopout",
              payload: {
                id: 'game',
                name: null,
              },
            });
            dispatch({
              type: "setErrorData",
              payload:
                e.response && e.response.data ? e.response.data.response : {},
            });
            dispatch({
              type: "setLastGame",
              payload: name,
            });
            dispatch({
              type: "setErrorType",
              payload: "ws",
            });
            setActivePanel({ ...activePanel, game: "errorPanel" });
          }
        });
    });
  };

  return (
    <ConfigProvider scheme="inherit" platform={isAndroid ? "android" : "ios"}>
      <AdaptivityProvider hasMouse={false}>
        <AppRoot>
          <Root activeView={activeView}>
            <View
              id="home"
              activePanel={activePanel.home}
              popout={
                Object.keys(user.db).length === 0 ? (
                  <ScreenSpinner size="medium" />
                ) : null
              }
            >
              <MainHome
                id="mainhome"
                updateUser={updateUser}
                openGame={openGame}
                openView={openView}
              />
            </View>
            <View id="createTeam" activePanel={activePanel.createTeam}>
              <CreateTeam id="createTeam" close={closeGame} />
            </View>
            <View
              id="game"
              activePanel={activePanel.game}
              popout={ui.activePopout.game}
            >
              <Thimble
                id="thimble"
                close={closeGame}
                openErrorWs={openErrorWs}
                getToken={getToken}
              />
              <ErrorPanelWs
                reopenGame={reopenGame}
                id="errorPanel"
                close={closeGame}
              />
            </View>
            <View id="transfer" activePanel={activePanel.transfer}>
              <Transfer
                id="transfer"
                close={closeGame}
                openView={openView}
                openErrorXhr={openErrorXhr}
              />
            </View>
            <View id="error" activePanel="errorPanel">
              <ErrorPanel
                getUser={() => {
                  updateUser();
                  openView("home");
                }}
                id="errorPanel"
              />
            </View>
          </Root>
        </AppRoot>
      </AdaptivityProvider>
    </ConfigProvider>
  );
};

export default App;
