import {
    Panel,
    PanelHeader,
    PanelHeaderContent,
    PanelHeaderBack,
    FixedLayout,
    Search,
  } from "@vkontakte/vkui";

const Transfer = ({ id, close }) => {
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
          <Search placeholder="Поиск"/>
      </FixedLayout>
      <div className="panel--in">

      </div>
    </Panel>
  );
};

export default Transfer;
