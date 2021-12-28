import {
  Panel,
  PanelHeader,
  PanelHeaderContent,
  PanelHeaderBack,
  FormItem,
  Input,
  Button,
} from "@vkontakte/vkui";
import { Icon28PictureOutline } from "@vkontakte/icons";
import { ReactComponent as Vkc } from "../../svg/vkc.svg";
import { Icon28DoneOutline } from '@vkontakte/icons';

const CreateTeam = ({ id, close }) => {
  return (
    <Panel id={id}>
      <PanelHeader separator={false}>
        <PanelHeaderContent
          before={<PanelHeaderBack hasHover={false} onClick={() => close()} />}
        >
          Создание команды
        </PanelHeaderContent>
      </PanelHeader>
      <div className="panel--in">
        <FormItem top={"Введите название команды:"}>
          <Input />
        </FormItem>
        <FormItem>
        <Button
          size="l"
          mode="secondary"
          before={<Icon28PictureOutline />}
          stretched
        >
          Загрузить картинку
        </Button>
        </FormItem>
        <FormItem top={"Вставьте ссылку на картинку команды:"}>
          <Input placeholder="https://vk.com/photo200872492_265693385" />
        </FormItem>
        <FormItem>
        <Button
          size="l"
          mode="primary"
          before={<Icon28DoneOutline />}
          stretched
        >
          <span className="verticalText">
            Создать за 25 000 000
            <Vkc />
          </span>
        </Button>
        </FormItem>
      </div>
    </Panel>
  );
};

export default CreateTeam;
