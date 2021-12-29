import { Icon28Users3Outline } from "@vkontakte/icons";
import { Icon56GestureOutline } from "@vkontakte/icons";
import { Icon28AddOutline } from '@vkontakte/icons';
import { Icon28LocationOutline } from '@vkontakte/icons';
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
  Button
} from "@vkontakte/vkui";
import { useState } from "react";
const Teams = ({ id, updateRating, openView }) => {
  const [type, setType] = useState("top");
  const changeType = (n) => {
    if (n !== type) {
      setType(n);
    }
  };

  return (
    <Panel id={id}>
      <PanelHeader separator={false}>
        <PanelHeaderContent before={<Icon28Users3Outline />}>
          Команды
        </PanelHeaderContent>
      </PanelHeader>
      <Tabs>
        <TabsItem
          hasHover={false}
          onClick={() => changeType(`top`)}
          selected={type === "top"}
        >
          Топ команд
        </TabsItem>
        <TabsItem
          hasHover={false}
          onClick={() => changeType(`myteam`)}
          selected={type === "myteam"}
        >
          Моя команда
        </TabsItem>
      </Tabs>
      {type === "myteam" && (
        <Placeholder
          icon={<Icon56GestureOutline fill="rgb(255, 152, 0)" />}
          stretched
          header={"Вы не состоите в команде"}
          action={<div className="buttons">
            <Button size='m' before={<Icon28AddOutline/>} onClick={() => openView('createTeam')}>Создать команду</Button>
            <Button size='m' before={<Icon28LocationOutline/>} onClick={() => changeType('top')}>Найти команду</Button>
          </div>}
        >
          Присоединитесь к команде и получайте множество бонусов за активную
          игру!
        </Placeholder>
      )}
      {type === "top" && (
        <>
          <div className="panel--in" style={{ paddingBottom: 0 }}>
            <div className="ratingBanner">
              <div className="desc">
                Каждую неделю, в ночь с воскресенья на понедельник мы
                разыгрываем{" "}
                <div className="count">
                  1 000 000 000 VKC + 0.5% всех ставок
                </div>{" "}
                среди топ-5 кланов.
                <br />
                Призовой баланс на данный момент:
                <br />
                <div className="sum">4 037 894 486 VKC</div>
              </div>
            </div>
          </div>
          <PullToRefresh
            onRefresh={() => updateRating(type)}
            isFetching={false}
          >
            <div className="panel--in" style={{ paddingTop: 0 }}>
              <List>
                <Link href={"https://vk.com/id1"} target="_blank">
                  <SimpleCell
                    before={
                      <>
                        <table className="table">
                          <tr>
                            <td>
                              <div class="ratingPosition">1</div>
                            </td>
                            <td style={{ position: "relative" }}>
                              <Avatar
                                className="ratingAvatar"
                                size={48}
                                src={""}
                              />
                            </td>
                          </tr>
                        </table>
                      </>
                    }
                    description={`163 000 000 000 VKC`}
                    indicator={
                      <div className="prize">
                        <div className="header">НАГРАДА</div>
                        <div className="sum">2.01KKK</div>
                      </div>
                    }
                  >
                    GG Game
                  </SimpleCell>
                </Link>
                <Link href={"https://vk.com/id1"} target="_blank">
                  <SimpleCell
                    before={
                      <>
                        <table className="table">
                          <tr>
                            <td>
                              <div class="ratingPosition">2</div>
                            </td>
                            <td style={{ position: "relative" }}>
                              <Avatar
                                className="ratingAvatar myTeam"
                                size={48}
                                src={""}
                              />
                            </td>
                          </tr>
                        </table>
                      </>
                    }
                    description={`134 000 000 000 VKC`}
                    indicator={
                      <div className="prize">
                        <div className="header">НАГРАДА</div>
                        <div className="sum">605.68KK</div>
                      </div>
                    }
                  >
                    GG Game
                  </SimpleCell>
                </Link>
              </List>
            </div>
          </PullToRefresh>
        </>
      )}
    </Panel>
  );
};

export default Teams;
