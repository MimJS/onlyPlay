import {
  PullToRefresh,
  Panel,
  SimpleCell,
  Avatar,
  PanelHeader,
} from "@vkontakte/vkui";
import { ReactComponent as Vkc } from "../../svg/vkc.svg";
import { Icon28MoneyRequestOutline } from "@vkontakte/icons";
import { Icon28MoneySendOutline } from "@vkontakte/icons";
import { Icon24Coins } from "@vkontakte/icons";
import { useEffect, useState } from "react";
import { Icon28SendOutline } from "@vkontakte/icons";
//import online from "../../img/online.png";
import { useSelector, useDispatch } from "react-redux";
import util from "../../lib/util";
import balance from "../../img/balance.png";
import buy from "../../img/buy.png";
import sell from "../../img/sell.png";
import transfer from "../../img/transfer.jpg";
import stat_all from "../../img/stat_all.jpg";
import stat_today from "../../img/stat_today.jpg";

const Profile = ({ id, updateUser, openView }) => {
  const user = useSelector((s) => s.user);
  const dispatch = useDispatch();
  const config = useSelector((s) => s.config);
  const [statType, setStatType] = useState({
    day: "win",
    all: "win",
  });

  useEffect(() => {
    const imageList = [balance, buy, sell, transfer, stat_all, stat_today];
    imageList.forEach((image) => {
      new Image().src = image;
    });
  }, []);

  return (
    <Panel id={id}>
      <PanelHeader separator={false}>
        <SimpleCell
          disabled
          before={
            <Avatar
              size={40}
              src={Object.keys(user.db).length > 0 ? user.vk.photo_100 : ""}
            />
          }
          description={
            Object.keys(user.db).length > 0
              ? user.vk.first_name + " " + user.vk.last_name
              : "Загрузка..."
          }
        >
          Профиль
        </SimpleCell>
      </PanelHeader>
      {Object.keys(user.db).length > 0 && (
        <PullToRefresh onRefresh={() => updateUser()} isFetching={false}>
          <div className="panel--in">
            <div className="block--balance">
              <span className="title">баланс</span>
              <span className="balance">
                {util.number_format(user.db.coins)} <Vkc />
              </span>
            </div>
            <div className="actions">
              <div
                className="block block--payin"
                onClick={() =>
                  dispatch({
                    type: "updateModal",
                    payload: {
                      id: "profile",
                      name: "coinIn",
                    },
                  })
                }
              >
                <div className="in">
                  <Icon28MoneySendOutline width={36} height={36} />
                  <span>пополнить</span>
                </div>
              </div>
              <div
                className="block block--payout"
                onClick={() =>
                  dispatch({
                    type: "updateModal",
                    payload: {
                      id: "profile",
                      name: "coinOut",
                    },
                  })
                }
              >
                <div className="in">
                  <Icon28MoneyRequestOutline width={36} height={36} />
                  <span>вывести</span>
                </div>
              </div>
            </div>
            <div
              className="block--transfer"
              onClick={() => openView("transfer")}
            >
              <Icon28SendOutline width={48} height={48} />
              <span className="text">Перевести другу</span>
            </div>
            <div className="block--stat block--stat-today">
              <div className="up_text">
                <span>статистика за день</span>
              </div>
              <div
                className="right_btn"
                onClick={() => setStatType({ ...statType })}
              >
                <Icon24Coins width={18} height={18} />
              </div>
              <div className="block--in">
                <span>выигрыши</span>
                <span>
                  {statType.day === "win"
                    ? user.db.stat_day_win
                    : user.db.stat_day_win_sum}
                </span>
              </div>
              <div className="block--in">
                <span>проигрыши</span>
                <span>
                  {statType.day === "win"
                    ? user.db.stat_day_lose
                    : user.db.stat_day_lose_sum}
                </span>
              </div>
            </div>
            <div className="block--stat block--stat-all">
              <div className="up_text">
                <span>за все время</span>
              </div>
              <div className="right_btn">
                <Icon24Coins width={18} height={18} />
              </div>
              <div className="block--in">
                <span>выигрыши</span>
                <span>
                  {statType.all === "win"
                    ? user.db.stat_win
                    : user.db.stat_win_sum}
                </span>
              </div>
              <div className="block--in">
                <span>проигрыши</span>
                <span>
                  {statType.all === "win"
                    ? user.db.stat_lose
                    : user.db.stat_lose_sum}
                </span>
              </div>
            </div>
            <div className="online">
              <span className="in">
                Онлайн: {config.globalData.appOnline} {/*<img src={online} />*/}
              </span>
            </div>
          </div>
        </PullToRefresh>
      )}
      <div className="preloader">
        {[...Array(25)].map((v, i) => (
          <div key={i} className={"item" + i}></div>
        ))}
      </div>
    </Panel>
  );
};

export default Profile;
