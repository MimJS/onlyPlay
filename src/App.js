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
import Tower from "./views/games/tower";
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
import ErrorPanel from "./components/ErrorPanel";

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

  const load_photo = (imageList) => {
    imageList.forEach((image) => {
      new Image().src = image;
    });
  };

  const openGame = (name) => {
    setActiveView("game");
    setActivePanel({ ...activePanel, game: name });
  };

  const openView = (name) => {
    if (activeView != name) {
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
        if (e.response.status == 400) {
          dispatch({
            type: "setErrorData",
            payload: e.response.data.response ? e.response.data.response : {},
          });
          setActiveView("error");
          dispatch({
            type: "setNewDb",
            payload: {},
          });
        }
      });
  };

  useEffect(async () => {
    if (Object.keys(user.vk).length == 0) {
      load_photo(photos);
      const vk = await bridge.send("VKWebAppGetUserInfo");
      dispatch({
        type: "setNewVk",
        payload: vk,
      });
      updateUser(vk);
    }
  }, []);

  return (
    <ConfigProvider scheme="inherit" platform={isAndroid ? "android" : "ios"}>
      <AdaptivityProvider hasMouse={false}>
        <AppRoot>
          <Root activeView={activeView}>
            <View
              id="home"
              activePanel={activePanel.home}
              popout={
                Object.keys(user.db).length == 0 ? (
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
            <View id="game" activePanel={activePanel.game}>
              <Tower id="tower" close={closeGame} />
            </View>
            <View id="transfer" activePanel={activePanel.transfer}>
              <Transfer id="transfer" close={closeGame} openView={openView} />
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
