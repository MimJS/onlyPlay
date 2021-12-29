import {
  Panel,
  PanelHeader,
  PanelHeaderContent,
  SimpleCell,
  Link,
} from "@vkontakte/vkui";
import { Icon28More } from "@vkontakte/icons";
import { Icon24AddOutline } from "@vkontakte/icons";
import { Icon24Message } from "@vkontakte/icons";
import { Icon24LogoVk } from "@vkontakte/icons";
import { Icon24Headphones } from "@vkontakte/icons";
import { Icon24Gift } from "@vkontakte/icons";
import { Icon24Send } from "@vkontakte/icons";
import bridge from "@vkontakte/vk-bridge";
import { useDispatch, useSelector } from "react-redux";

const More = ({ id }) => {
  const dispatch = useDispatch();
  const ui = useSelector((s) => s.ui);
  return (
    <Panel id={id}>
      <PanelHeader separator={false}>
        <PanelHeaderContent before={<Icon28More />}>Ещё</PanelHeaderContent>
      </PanelHeader>
      <div className="panel--in">
        <SimpleCell
          before={<Icon24AddOutline fill="#FD980B" />}
          onClick={() => bridge.send("VKWebAppAddToCommunity")}
        >
          Добавить в сообщество
        </SimpleCell>
        <Link href="https://t.me/vkonlyplay" target="_blank">
          <SimpleCell before={<Icon24Send fill="rgb(3, 169, 244)" />}>
            Наш канал с промокодами
          </SimpleCell>
        </Link>
        <SimpleCell
          before={<Icon24Gift fill="rgb(156, 39, 176)" />}
          onClick={() => {
            dispatch({
              type: "updateModal",
              payload: {
                id: "more",
                name: "promo",
              },
            });
          }}
        >
          Активировать промо
        </SimpleCell>
        <Link
          href="https://vk.me/join/AJQ1d4NFtx4GTneX3BzeRMA2"
          target="_blank"
        >
          <SimpleCell before={<Icon24Message fill="#E9608E" />}>
            Чат игроков
          </SimpleCell>
        </Link>
        <Link href="https://vk.com/vkonlyplay" target="_blank">
          <SimpleCell before={<Icon24LogoVk />}>Наша группа</SimpleCell>
        </Link>
        <Link href="https://vk.com/vkonlyplay_help" target="_blank">
          <SimpleCell before={<Icon24Headphones fill="#94D45C" />}>
            Тех. Поддержка
          </SimpleCell>
        </Link>
      </div>
      {ui.activeSnackbar.more}
    </Panel>
  );
};

export default More;
