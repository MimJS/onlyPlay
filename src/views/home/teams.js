import { Icon28Users3Outline } from "@vkontakte/icons";
import { Icon56GestureOutline } from "@vkontakte/icons";
import { Icon28AddOutline } from "@vkontakte/icons";
import { Icon28LocationOutline } from "@vkontakte/icons";
import {
  Panel,
  PanelHeader,
  PanelHeaderContent,
  Tabs,
  TabsItem,
  PullToRefresh,
  List,
  SimpleCell,
  Avatar,
  Link,
  Placeholder,
  Button,
  Spinner,
} from "@vkontakte/vkui";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { number_format } from "../../lib/util";

const Teams = ({ id, openView, openErrorXhr }) => {
  const dispatch = useDispatch();
  const user = useSelector((s) => s.user);
  const ui = useSelector((s) => s.ui);
  const config = useSelector((s) => s.config);
  const [loading, setLoading] = useState(true);
  const [teamsData, setTeamsData] = useState({});
  const changeType = (n) => {
    if (n !== ui.activeTopTeams) {
      dispatch({
        type: "setActiveTopTeams",
        payload: n,
      });
    }
  };

  const updateTeams = () => {
    axios
      .post(config.xhr_url, {
        authorization: {
          type: "vk-mini-apps",
          vk: window.location.search,
          userId: String(user.vk.id),
        },
        event: "getTeamsRating",
      })
      .then((r) => {
        setTeamsData((prevState) => ({
          ...prevState,
          rating: r.data.response.rating,
        }));
        dispatch({
          type: "updatePopout",
          payload: {
            id: "teams",
            name: null,
          },
        });
      })
      .catch((e) => {
        openErrorXhr(e);
      });
  };

  const getTeams = () => {
    axios
      .post(config.xhr_url, {
        authorization: {
          type: "vk-mini-apps",
          vk: window.location.search,
          userId: String(user.vk.id),
        },
        event: "getTeamsRating",
      })
      .then((r) => {
        setTeamsData(r.data.response);
        setLoading(false);
        dispatch({
          type: "setCreateTeamCost",
          payload: r.data.response.settings.teams.createPrice,
        });
        dispatch({
          type: "updatePopout",
          payload: {
            id: "teams",
            name: null,
          },
        });
      })
      .catch((e) => {
        openErrorXhr(e);
      });
  };

  useEffect(() => {
    if (loading === true) {
      //getTeams();
    }
  }, [loading]);

  return (
    <Panel id={id}>
      <PanelHeader separator={false}>
        <PanelHeaderContent before={<Icon28Users3Outline />}>
          ??????????????
        </PanelHeaderContent>
      </PanelHeader>
      <div className="panel--in">
        <div className="rating_disabled">
          <span className="in">?????? ???????????? ?????????? ?????????????? ??????????</span>
        </div>
      </div>
      {/* 
      <Tabs>
        <TabsItem
          hasHover={false}
          onClick={() => changeType(`top`)}
          selected={ui.activeTopTeams === "top"}
        >
          ?????? ????????????
        </TabsItem>
        <TabsItem
          hasHover={false}
          onClick={() => changeType(`myteam`)}
          selected={ui.activeTopTeams === "myteam"}
        >
          ?????? ??????????????
        </TabsItem>
      </Tabs>
      {ui.activeTopTeams === "myteam" && (
        <>
          {!teamsData.myTeam ? (
            <Placeholder
              icon={<Icon56GestureOutline fill="rgb(255, 152, 0)" />}
              stretched
              header={"???? ???? ???????????????? ?? ??????????????"}
              action={
                <div className="buttons">
                  <Button
                    size="m"
                    before={<Icon28AddOutline />}
                    onClick={() => openView("createTeam")}
                  >
                    ?????????????? ??????????????
                  </Button>
                  <Button
                    size="m"
                    before={<Icon28LocationOutline />}
                    onClick={() => changeType("top")}
                  >
                    ?????????? ??????????????
                  </Button>
                </div>
              }
            >
              ???????????????????????????? ?? ?????????????? ?? ?????????????????? ?????????????????? ?????????????? ???? ????????????????
              ????????!
            </Placeholder>
          ) : (
            <div>kek</div>
          )}
        </>
      )}
      {ui.activeTopTeams === "top" && !loading && (
        <>
          <div className="panel--in" style={{ paddingBottom: 0 }}>
            <div className="ratingBanner">
              <div className="desc">
                ???????????? ????????????, ?? ???????? ?? ?????????????????????? ???? ?????????????????????? ????
                ??????????????????????{" "}
                <div className="count">
                  {number_format(teamsData.rating.rewards.amount)} VKC + 0.5%
                  ???????? ????????????
                </div>{" "}
                ?????????? ??????-5 ????????????.
                <br />
                ???????????????? ???????????? ???? ???????????? ????????????:
                <br />
                <div className="sum">
                  {number_format(teamsData.rating.rewards.current)} VKC
                </div>
              </div>
            </div>
          </div>
          <PullToRefresh onRefresh={() => updateTeams()} isFetching={false}>
            <div className="panel--in" style={{ paddingTop: 0 }}>
              <List>
                {teamsData &&
                  teamsData.rating.teams.map((v, i) => (
                    <SimpleCell
                      key={v.id}
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
                                  src={v.photo}
                                />
                              </td>
                            </tr>
                          </table>
                        </>
                      }
                      description={`${number_format(v.coins)} VKC`}
                      indicator={
                        v.rewards && (
                          <div className="prize">
                            <div className="header">??????????????</div>
                            <div className="sum">{v.rewards}</div>
                          </div>
                        )
                      }
                    >
                      {v.name}
                    </SimpleCell>
                  ))}
              </List>
            </div>
          </PullToRefresh>
        </>
      )}
      */}
    </Panel>
  );
};

export default Teams;
