import {
  Panel,
  View,
  Tabbar,
  TabbarItem,
  Epic,
  ConfigProvider,
  ModalRoot,
  ModalPage,
  ModalPageHeader,
  PanelHeaderClose,
  FormItem,
  Input,
  Button,
  ScreenSpinner,
  Snackbar,
} from "@vkontakte/vkui";
import { useState } from "react";
import { Icon28UserCircleOutline } from "@vkontakte/icons";
import { Icon28Users3Outline } from "@vkontakte/icons";
import { Icon28GameOutline } from "@vkontakte/icons";
import { Icon28PollSquareOutline } from "@vkontakte/icons";
import { Icon28More } from "@vkontakte/icons";
import { Icon24MoneyTransfer } from "@vkontakte/icons";
import { Icon24Coins } from "@vkontakte/icons";
import { Icon24DoneOutline } from "@vkontakte/icons";
import { Icon48WritebarDone } from "@vkontakte/icons";

import Profile from "./profile";
import More from "./more";
import Games from "./games";
import Rating from "./rating";
import Teams from "./teams";
import axios from "axios";

import { useSelector, useDispatch } from "react-redux";

const MainHome = ({ id, updateUser, openGame, openView }) => {
  const [coinInSum, setCoinInSum] = useState(1000000);
  const [coinOutSum, setCoinOutSum] = useState(0);
  const [promo, setPromo] = useState("");
  const [promoStatus, setPromoStatus] = useState({
    isError: false,
    errorText: "",
  });
  const user = useSelector((s) => s.user);
  const ui = useSelector((s) => s.ui);
  const config = useSelector((s) => s.config);
  const dispatch = useDispatch();

  const setSub = (n) => {
    if (n != ui.activeUnder) {
      if (n == "profile") {
        updateUser();
      }
      if (n == "rating" || n == "teams") {
        getRating();
      }
      if (n == "more") {
        setPromoStatus({
          isError: false,
          errorText: "",
        });
        setPromo("");
        dispatch({
          type: "updateSnackbar",
          payload: {
            id: "more",
            name: null,
          },
        });
      }
      dispatch({ type: "setActiveUnder", payload: n });
    }
  };

  const updateRating = (type) => {
    if (type == "day") {
      axios
        .post(config.xhr_url, {
          authorization: {
            type: "vk-mini-apps",
            vk: window.location.search,
            userId: user.vk.id,
          },
          event: "getRatings",
        })
        .then((r) => {
          dispatch({
            type: "updateRating",
            payload: {
              data: r.data.response.dayTop,
              type: "dayTop",
            },
          });
        })
        .catch((e) => {
          console.log(e);
        });
    }
    if (type == "week") {
      axios
        .post(config.xhr_url, {
          authorization: {
            type: "vk-mini-apps",
            vk: window.location.search,
            userId: user.vk.id,
          },
          event: "getRatings",
        })
        .then((r) => {
          dispatch({
            type: "updateRating",
            payload: {
              data: r.data.response.weekTop,
              type: "weekTop",
            },
          });
        })
        .catch((e) => {
          console.log(e);
        });
    }
    if (type == "hour") {
      axios
        .post(config.xhr_url, {
          authorization: {
            type: "vk-mini-apps",
            vk: window.location.search,
            userId: user.vk.id,
          },
          event: "getRatings",
        })
        .then((r) => {
          dispatch({
            type: "updateRating",
            payload: {
              data: r.data.response.hourTop,
              type: "hourTop",
            },
          });
        })
        .catch((e) => {
          console.log(e);
        });
    }
  };

  const getRating = () => {
    dispatch({
      type: "setRating",
      payload: {},
    });
    dispatch({
      type: "updatePopout",
      payload: {
        id: "rating",
        name: <ScreenSpinner size="medium" />,
      },
    });
    axios
      .post(config.xhr_url, {
        authorization: {
          type: "vk-mini-apps",
          vk: window.location.search,
          userId: user.vk.id,
        },
        event: "getRatings",
      })
      .then((r) => {
        dispatch({
          type: "setRating",
          payload: r.data.response,
        });
        dispatch({
          type: "updatePopout",
          payload: {
            id: "rating",
            name: null,
          },
        });
      })
      .catch((e) => {
        console.log(e);
        dispatch({
          type: "updatePopout",
          payload: {
            id: "rating",
            name: null,
          },
        });
      });
  };

  const activatePromo = () => {
    axios
      .post(config.xhr_url, {
        authorization: {
          type: "vk-mini-apps",
          vk: window.location.search,
          userId: user.vk.id,
        },
        event: "activatePromocode",
        promocode: promo,
      })
      .then((r) => {
        console.log(r.data.response);
        if (r.data.response.isError == true) {
          setPromoStatus(r.data.response);
        } else {
          setPromo("");
          dispatch({
            type: "updateModal",
            payload: {
              id: "more",
              name: null,
            },
          });
          dispatch({
            type: "updateSnackbar",
            payload: {
              id: "more",
              name: (
                <Snackbar
                  onClose={() => {
                    dispatch({
                      type: "updateSnackbar",
                      payload: {
                        id: "more",
                        name: null,
                      },
                    });
                  }}
                  before={
                    <Icon48WritebarDone fill="#8BC34A" width={36} height={36} />
                  }
                >
                  Промокод успешно активирован
                </Snackbar>
              ),
            },
          });
        }
      })
      .catch((e) => {});
  };

  const moreModal = (
    <ModalRoot activeModal={ui.activeModal.more}>
      <ModalPage
        id="promo"
        onClose={() =>
          dispatch({
            type: "updateModal",
            payload: {
              id: "more",
              name: null,
            },
          })
        }
        header={
          <ModalPageHeader
            left={
              <PanelHeaderClose
                hasHover={false}
                onClick={() =>
                  dispatch({
                    type: "updateModal",
                    payload: {
                      id: "more",
                      name: null,
                    },
                  })
                }
              />
            }
          >
            Активация промо
          </ModalPageHeader>
        }
        dynamicContentHeight
      >
        <FormItem
          top="Введите промокод:"
          status={promoStatus.isError == true && "error"}
          bottom={promoStatus.isError == true && promoStatus.errorText}
        >
          <Input
            type="text"
            value={promo}
            onChange={(e) => {
              setPromo(e.currentTarget.value);
              if (e.currentTarget.value.length == 0) {
                setPromoStatus({
                  isError: false,
                  errorText: "",
                });
              }
            }}
          />
        </FormItem>
        <FormItem>
          <Button
            size="l"
            stretched
            before={<Icon24DoneOutline />}
            onClick={() => activatePromo()}
          >
            АКТИВИРОВАТЬ
          </Button>
        </FormItem>
      </ModalPage>
    </ModalRoot>
  );

  const profileModal = (
    <ModalRoot activeModal={ui.activeModal.profile}>
      <ModalPage
        id="coinIn"
        onClose={() =>
          dispatch({
            type: "updateModal",
            payload: {
              id: "profile",
              name: null,
            },
          }) & updateUser()
        }
        header={
          <ModalPageHeader
            left={
              <PanelHeaderClose
                hasHover={false}
                onClick={() =>
                  dispatch({
                    type: "updateModal",
                    payload: {
                      id: "profile",
                      name: null,
                    },
                  })
                }
              />
            }
          >
            Пополнение
          </ModalPageHeader>
        }
      >
        <FormItem top="Введите сумму пополнения:" style={{ paddingTop: 0 }}>
          <Input
            type="number"
            value={coinInSum}
            onChange={(e) => setCoinInSum(e.currentTarget.value)}
          />
        </FormItem>
        <FormItem style={{ paddingTop: 0 }}>
          <Button
            size="l"
            disabled={coinInSum == 0}
            stretched
            before={<Icon24MoneyTransfer />}
            onClick={() => {
              window.open(
                `https://vk.com/coin#x650454742_${
                  coinInSum * 1000
                }_2000000000_1`,
                "_blank"
              );
            }}
          >
            ПОПОЛНИТЬ
          </Button>
        </FormItem>
      </ModalPage>
      <ModalPage
        id="coinOut"
        onClose={() =>
          dispatch({
            type: "updateModal",
            payload: {
              id: "profile",
              name: null,
            },
          })
        }
        header={
          <ModalPageHeader
            left={
              <PanelHeaderClose
                hasHover={false}
                onClick={() =>
                  dispatch({
                    type: "updateModal",
                    payload: {
                      id: "profile",
                      name: null,
                    },
                  })
                }
              />
            }
          >
            Вывод
          </ModalPageHeader>
        }
      >
        <FormItem top="Введите сумму вывода:" style={{ paddingTop: 0 }}>
          <Input
            type="number"
            value={coinOutSum}
            onChange={(e) => setCoinOutSum(e.currentTarget.value)}
          />
        </FormItem>
        <FormItem style={{ paddingTop: 0 }}>
          <Button
            size="l"
            stretched
            before={<Icon24Coins />}
            mode="secondary"
            onClick={() => {
              setCoinOutSum(user.db.coins);
            }}
          >
            ВЫВЕСТИ ВСЁ
          </Button>
        </FormItem>
        <FormItem style={{ paddingTop: 0 }}>
          <Button
            size="l"
            disabled={coinOutSum == 0}
            stretched
            before={<Icon24MoneyTransfer />}
            onClick={() => {}}
          >
            ВЫВЕСТИ
          </Button>
        </FormItem>
      </ModalPage>
    </ModalRoot>
  );

  return (
    <Panel id={id}>
      <Epic
        activeStory={ui.activeUnder}
        tabbar={
          Object.keys(user.db).length > 0 && (
              <Tabbar>
                <TabbarItem
                  onClick={() => setSub("profile")}
                  selected={ui.activeUnder === "profile"}
                  text="Профиль"
                >
                  <Icon28UserCircleOutline />
                </TabbarItem>
                <TabbarItem
                  onClick={() => setSub("teams")}
                  selected={ui.activeUnder === "teams"}
                  text="Команды"
                >
                  <Icon28Users3Outline />
                </TabbarItem>
                <TabbarItem
                  onClick={() => setSub("games")}
                  selected={ui.activeUnder === "games"}
                  text="Играть"
                >
                  <Icon28GameOutline />
                </TabbarItem>
                <TabbarItem
                  onClick={() => setSub("rating")}
                  selected={ui.activeUnder === "rating"}
                  text="Рейтинг"
                >
                  <Icon28PollSquareOutline />
                </TabbarItem>
                <TabbarItem
                  onClick={() => setSub("more")}
                  selected={ui.activeUnder === "more"}
                  text="Ещё"
                >
                  <Icon28More />
                </TabbarItem>
              </Tabbar>
  
          )
        }
      >
        <View id="profile" activePanel="profile" modal={profileModal}>
          <Profile id="profile" updateUser={updateUser} />
        </View>
        <View id="more" activePanel="more" modal={moreModal}>
          <More id="more" />
        </View>
        <View id="games" activePanel="games">
          <Games id="games" openGame={openGame} />
        </View>
        <View id="rating" activePanel="rating" popout={ui.activePopout.rating}>
          <Rating id="rating" updateRating={updateRating} />
        </View>
        <View id="teams" activePanel="teams">
          <Teams id="teams" updateRating={updateRating} openView={openView} />
        </View>
      </Epic>
    </Panel>
  );
};

export default MainHome;
