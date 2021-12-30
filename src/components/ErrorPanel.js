import { CellButton, Panel, Placeholder, PanelHeader, PanelHeaderContent, PanelHeaderBack } from "@vkontakte/vkui";
import React from "react";
import { Icon56ErrorOutline } from "@vkontakte/icons";
import { useSelector } from "react-redux";
const ErrorPanel = ({ getUser, ...props }) => {
  const error = useSelector((s) => s.config);
  return (
    <Panel centered {...props}>
      <Placeholder
        stretched
        action={
          <CellButton
            hasHover={false}
            hasActive={false}
            onClick={() => {
              getUser();
            }}
            size="l"
            mode="tertiary"
          >
            Повторить попытку
          </CellButton>
        }
        icon={<Icon56ErrorOutline fill="#D8605F" />}
        header="Ошибка"
      >
        {Object.keys(error.errorData).length === 0
          ? "Вы были отключены от сервера"
          : error.errorData.error_public}
      </Placeholder>
    </Panel>
  );
};

export const ErrorPanelWs = ({ close, reopenGame, ...props }) => {
  const error = useSelector((s) => s.config);
  return (
    <Panel centered {...props}>
       <PanelHeader separator={false}>
        <PanelHeaderContent
          before={
            <PanelHeaderBack
              hasHover={false}
              onClick={() => {
                close();
              }}
            />
          }
        >
          Ошибка
        </PanelHeaderContent>
      </PanelHeader>
      <Placeholder
        stretched
        action={
          <CellButton
            hasHover={false}
            hasActive={false}
            onClick={() => {
              reopenGame(error.lastGame);
            }}
            size="l"
            mode="tertiary"
          >
            Повторить попытку
          </CellButton>
        }
        icon={<Icon56ErrorOutline fill="#D8605F" />}
        header="Ошибка"
      >
        {Object.keys(error.errorData).length === 0
          ? "Вы были отключены от сервера"
          : error.errorData.error_public}

      </Placeholder>
    </Panel>
  );
};

export default ErrorPanel;
