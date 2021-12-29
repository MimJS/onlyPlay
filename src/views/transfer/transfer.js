import {
  Panel,
  PanelHeader,
  PanelHeaderContent,
  PanelHeaderBack,
  FixedLayout,
  Search,
  Placeholder,
  Spinner,
  CellButton,
  SimpleCell,
  Avatar,
} from "@vkontakte/vkui";
import { useState, useEffect } from "react";
import bridge from "@vkontakte/vk-bridge";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { Icon56ErrorOutline } from "@vkontakte/icons";
import { number_format } from "../../lib/util";
import { ReactComponent as Vkc } from "../../svg/vkc.svg";

const Transfer = ({ id, close, openView }) => {
  const [isError, setIsError] = useState(false);
  const [finishRequest, setFinishRequest] = useState(false);
  const [friendsList, setFriendsList] = useState([]);
  const config = useSelector((s) => s.config);
  const vk = useSelector((s) => s.user.vk);
  const dispatch = useDispatch();

  const getFriendsData = async (array) => {
    console.log("startgetData");
    let vkIds = "";
    array.forEach((v) => {
      vkIds += `${v.id},`;
    });
    console.log(vkIds);
    const token = await bridge
      .send("VKWebAppGetAuthToken", {
        app_id: config.appId,
        scope: "friends",
      })
      .catch(() => {
        return false;
      });
    if (token.access_token) {
      setFinishRequest(false);
      setIsError(false);
      const userData = await bridge.send("VKWebAppCallAPIMethod", {
        method: "users.get",
        request_id: "123456789",
        params: {
          user_ids: vkIds,
          v: "5.131",
          fields: "photo_100",
          access_token: token.access_token,
        },
      });
      let finishArray = [];
      array.forEach((v, i) => {
        finishArray.push({
          ...v,
          ...userData.response[i],
        });
      });
      setFriendsList(finishArray);
      console.log("userInfo");
      console.log(finishArray);
      setFinishRequest(true);
      setIsError(false);
    } else {
      setFinishRequest(true);
      setIsError(true);
    }
  };

  const get_friends = async () => {
    if (friendsList.length === 0) {
      const token = await bridge
        .send("VKWebAppGetAuthToken", {
          app_id: config.appId,
          scope: "friends",
        })
        .catch(() => {
          return false;
        });
      if (token.access_token) {
        setFinishRequest(false);
        setIsError(false);
        const list = await bridge.send("VKWebAppCallAPIMethod", {
          method: "friends.get",
          request_id: "123456789",
          params: {
            count: 1000,
            v: "5.131",
            access_token: token.access_token,
          },
        });
        axios
          .post(config.xhr_url, {
            authorization: {
              type: "vk-mini-apps",
              vk: window.location.search,
              userId: String(vk.id),
            },
            event: "getTransfersList",
            friends: list.response.items,
          })
          .then((r) => {
            getFriendsData(r.data.response.friends);
          })
          .catch((e) => {
            dispatch({
              type: "setErrorData",
              payload: (e.response && e.response.data)
                ? e.response.data.response
                : {},
            });
            openView("error");
            dispatch({
              type: "setNewDb",
              payload: {},
            });
          });
      } else {
        setFinishRequest(true);
        setIsError(true);
      }
    }
  };

  useEffect(() => {
    if (friendsList.length === 0) {
      console.log(friendsList);
      get_friends();
    }
  });

  return (
    <Panel id={id}>
      <PanelHeader separator={false}>
        <PanelHeaderContent
          before={<PanelHeaderBack hasHover={false} onClick={() => close()} />}
        >
          Перевод другу
        </PanelHeaderContent>
      </PanelHeader>
      <FixedLayout vertical="top">
        <Search placeholder="Поиск" />
      </FixedLayout>
      <div className="panel--in">
        {!finishRequest && (
          <Placeholder stretched>
            <Spinner size="medium" />
          </Placeholder>
        )}
        {finishRequest && (
          <>
            {isError && (
              <Placeholder
                icon={<Icon56ErrorOutline fill="#D8605F" />}
                stretched
                header={"Ошибка"}
                action={
                  <CellButton
                    hasHover={false}
                    hasActive={false}
                    onClick={() => get_friends()}
                  >
                    Предоставить доступ
                  </CellButton>
                }
              >
                Пидор, где токен, а !? Сука.
              </Placeholder>
            )}
            {!isError && friendsList.length > 0
              ? friendsList.map((v, i) => (
                  <SimpleCell
                    key={i}
                    className="userBlock"
                    before={<Avatar size={48} src={v.photo_100} />}
                    description={
                      <span className="verticalText">
                        {number_format(v.coins)} <Vkc />
                      </span>
                    }
                    hasHover={false}
                    hasActive={false}
                  >
                    {v.first_name && v.last_name
                      ? `${v.first_name} ${v.last_name}`
                      : `@id${v.id}`}
                  </SimpleCell>
                ))
              : "Empty..."}
          </>
        )}
      </div>
    </Panel>
  );
};

export default Transfer;
