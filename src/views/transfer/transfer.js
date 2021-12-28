import {
    Panel,
    PanelHeader,
    PanelHeaderContent,
    PanelHeaderBack,
  } from "@vkontakte/vkui";

const Transfer = ({ id, close }) => {
  return (
    <Panel id={id}>
      <PanelHeader separator={false}>
        <PanelHeaderContent
          before={<PanelHeaderBack hasHover={false} onClick={() => close()} />}
        >
          Создание команды
        </PanelHeaderContent>
      </PanelHeader>
      <div className="panel--in"></div>
    </Panel>
  );
};

export default Transfer;
