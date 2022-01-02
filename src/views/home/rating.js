import {
  Panel,
  PanelHeader,
  PanelHeaderContent,
  Tabs,
  TabsItem,
  Avatar,
  SimpleCell,
  ScreenSpinner,
  List,
  PullToRefresh,
  Link,
} from "@vkontakte/vkui";
import {
  Icon28PollSquareOutline,
  Icon16Globe,
  Icon16ClockOurline,
  Icon16Stars,
} from "@vkontakte/icons";
import { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import bridge from "@vkontakte/vk-bridge";
import util from "../../lib/util";

const Rating = ({ id, updateRating }) => {
  const [type, setType] = useState(`day`);
  const [vkData, setVkData] = useState([]);
  const rating = useSelector((s) => s.user.rating);
  const token = useSelector((s) => s.user.token);
  const dispatch = useDispatch();
  const changeType = useCallback(
    (t) => {
      if (t !== type) {
        setType(t);
        setVkData([]);
        // set screenspinner
      }
    },
    [type]
  );

  const getId = async () => {
    let temp = "";
    if (type === "day") {
      if (rating.dayTop.length > 0) {
        rating.dayTop.forEach((v) => {
          temp += `${v.id},`;
        });
        return temp;
      } else {
        return temp;
      }
    }
    if (type === "week") {
      if (rating.weekTop.length > 0) {
        rating.weekTop.forEach((v) => {
          temp += `${v.id},`;
        });
        return temp;
      } else {
        return temp;
      }
    }
  };

  useEffect(() => {
    async function init() {
      console.log(vkData.length);
      if (vkData.length === 0 && Object.keys(rating).length > 0) {
        const ids = await getId();
        console.log(ids);
        if (ids !== null && ids !== "") {
          if (token != null) {
            // method users.get
            const userData = await bridge.send("VKWebAppCallAPIMethod", {
              method: "users.get",
              request_id: "onlyPlay",
              params: {
                user_ids: ids,
                v: "5.131",
                fields: "photo_100",
                access_token: token,
              },
            });
            setVkData(userData.response);
          } else {
            dispatch({
              type: "updatePopout",
              payload: {
                id: "rating",
                name: <ScreenSpinner size="medium" />,
              },
            });
            const token = await bridge.send("VKWebAppGetAuthToken", {
              app_id: 8020410,
              scope: "friends",
            });
            dispatch({
              type: "updatePopout",
              payload: {
                id: "rating",
                name: null,
              },
            });
            if (token.access_token) {
              // safe temp token
              dispatch({
                type: "setUserToken",
                payload: token.access_token,
              });
              // method users.get
              const userData = await bridge.send("VKWebAppCallAPIMethod", {
                method: "users.get",
                request_id: "onlyPlay",
                params: {
                  user_ids: ids,
                  v: "5.131",
                  fields: "photo_100",
                  access_token: token.access_token,
                },
              });
              setVkData(userData.response);
            }
          }
        }
      }
    }
    init();
  });

  return (
    <Panel id={id}>
      <PanelHeader separator={false}>
        <PanelHeaderContent before={<Icon28PollSquareOutline />}>
          Рейтинг
        </PanelHeaderContent>
      </PanelHeader>
      <Tabs>
        <TabsItem
          hasHover={false}
          onClick={() => changeType(`hour`)}
          selected={type === "hour"}
        >
          Топ часа
        </TabsItem>
        <TabsItem
          hasHover={false}
          onClick={() => changeType(`day`)}
          selected={type === "day"}
        >
          Топ дня
        </TabsItem>
        <TabsItem
          hasHover={false}
          onClick={() => changeType(`week`)}
          selected={type === "week"}
        >
          Топ недели
        </TabsItem>
      </Tabs>
      <div className="panel--in" style={{ paddingBottom: 0 }}>
        {type === "hour" && Object.keys(rating).length > 0 && (
          <div className="paddingWrapper">
            <div className="ratingBanner">
              <div className="title">
                <div className="icon">
                  <Icon16ClockOurline width={28} height={28} />
                </div>
                <div className="text">Топ часа</div>
              </div>
              <div className="desc">
                Каждый час с 12:00 по 22:00 мы разыгрываем{" "}
                <div className="sum">
                  {rating.rewardsMaxValues.hourTop +
                    " " +
                    rating.currencyNames[0]}
                </div>{" "}
                среди топ-5 лучших игроков.
                <br />
              </div>
              <div className="bottom">
                <div className="block">
                  <div className="header">ВЫДАЧА ПРИЗОВ</div>
                  <div className="value">в 13:00</div>
                </div>
                <div className="sep"></div>
                <div className="block">
                  <div className="header">НАГРАДА</div>
                  <div className="value">
                    {rating.rewardsMaxValues.hourTop +
                      " " +
                      rating.currencyNames[0]}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        {type === "day" && Object.keys(rating).length > 0 && (
          <div className="paddingWrapper">
            <div className="ratingBanner">
              <div className="title">
                <div className="icon">
                  <Icon16Stars width={28} height={28} />
                </div>
                <div className="text">Топ дня</div>
              </div>
              <div className="desc">
                Каждый день в 0:00 мы разыгрываем{" "}
                <div className="sum">
                  {rating.rewardsMaxValues.dayTop +
                    " " +
                    rating.currencyNames[1]}
                </div>{" "}
                среди топ-50 лучших игроков.
                <br />
              </div>
              <div className="bottom">
                <div className="block">
                  <div className="header">ВЫДАЧА ПРИЗОВ</div>
                  <div className="value">в 0:00</div>
                </div>
                <div className="sep"></div>
                <div className="block">
                  <div className="header">НАГРАДА</div>
                  <div className="value">
                    {rating.rewardsMaxValues.dayTop +
                      " " +
                      rating.currencyNames[1]}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        {type === "week" && Object.keys(rating).length > 0 && (
          <div className="paddingWrapper">
            <div className="ratingBanner">
              <div className="title">
                <div className="icon">
                  <Icon16Globe width={28} height={28} />
                </div>
                <div className="text">Топ недели</div>
              </div>
              <div className="desc">
                Каждую неделю в ночь с воскресенья на понедельник мы разыгрываем{" "}
                <div className="sum">
                  {rating.rewardsMaxValues.weekTop +
                    " " +
                    rating.currencyNames[2]}
                </div>{" "}
                среди топ-10 лучших игроков.
                <br />
              </div>
              <div className="bottom">
                <div className="block">
                  <div className="header">ВЫДАЧА ПРИЗОВ</div>
                  <div className="value">в понедельник</div>
                </div>
                <div className="sep"></div>
                <div className="block">
                  <div className="header">НАГРАДА</div>
                  <div className="value">
                    {rating.rewardsMaxValues.weekTop +
                      " " +
                      rating.currencyNames[2]}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <PullToRefresh onRefresh={() => updateRating(type)} isFetching={false}>
        <div className="panel--in" style={{ paddingTop: 0 }}>
          <List>
            {type === "hour" && (
              <div className="rating_disabled">
                <span className="in">
                  Топ дня будет запущен за час до следующей выдачи
                </span>
              </div>
            )}
            {type === "week" &&
              Object.keys(rating).length > 0 &&
              rating.weekTop.map((v, i) => {
                return (
                  <Link href={"https://vk.com/id" + v.id} target="_blank">
                    <SimpleCell
                      key={i}
                      before={
                        <>
                          <table className="table">
                            <tr>
                              <td>
                                <div class="ratingPosition">{i + 1}</div>
                              </td>
                              <td style={{ position: "relative" }}>
                                <Avatar
                                  className="ratingAvatar"
                                  size={48}
                                  src={
                                    vkData.length === 0
                                      ? ""
                                      : vkData[i]
                                      ? vkData[i].photo_100
                                      : ""
                                  }
                                />
                              </td>
                            </tr>
                          </table>
                        </>
                      }
                      description={`${util.number_format(v.amount)} ${
                        rating.currencyNames[2]
                      }`}
                      indicator={
                        v.reward && (
                          <div className="prize">
                            <div className="header">ПОЛУЧИТ</div>
                            <div className="sum">{v.reward}</div>
                          </div>
                        )
                      }
                    >
                      {vkData.length === 0
                        ? "@id" + v.id
                        : vkData[i]
                        ? vkData[i].first_name + " " + vkData[i].last_name
                        : "@id" + v.id}
                    </SimpleCell>
                  </Link>
                );
              })}
            {type === "day" &&
              Object.keys(rating).length > 0 &&
              rating.dayTop.map((v, i) => {
                return (
                  <Link href={"https://vk.com/id" + v.id} target="_blank">
                    <SimpleCell
                      key={i}
                      before={
                        <>
                          <table className="table">
                            <tr>
                              <td>
                                <div class="ratingPosition">{i + 1}</div>
                              </td>
                              <td style={{ position: "relative" }}>
                                <Avatar
                                  className="ratingAvatar"
                                  size={48}
                                  src={
                                    vkData.length === 0
                                      ? ""
                                      : vkData[i]
                                      ? vkData[i].photo_100
                                      : ""
                                  }
                                />
                              </td>
                            </tr>
                          </table>
                        </>
                      }
                      description={`${util.number_format(v.amount)} ${
                        rating.currencyNames[1]
                      }`}
                      indicator={
                        v.reward && (
                          <div className="prize">
                            <div className="header">ПОЛУЧИТ</div>
                            <div className="sum">{v.reward}</div>
                          </div>
                        )
                      }
                    >
                      {vkData.length === 0
                        ? "@id" + v.id
                        : vkData[i]
                        ? vkData[i].first_name + " " + vkData[i].last_name
                        : "@id" + v.id}
                    </SimpleCell>
                  </Link>
                );
              })}
          </List>
        </div>
      </PullToRefresh>
    </Panel>
  );
};

export default Rating;
