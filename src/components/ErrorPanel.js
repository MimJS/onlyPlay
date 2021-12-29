import { CellButton, Panel, Placeholder } from "@vkontakte/vkui";
import React from "react";
import { Icon56ErrorOutline } from "@vkontakte/icons";
import { useSelector } from "react-redux";
const ErrorPanel = ({ getUser, ...props }) => {
  const error = useSelector((s) => s.config.errorData)
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
        {Object.keys(error).length === 0 ? 'Вы были отключены от сервера' : error.error_public}
      </Placeholder>
    </Panel>
  );
};

export default ErrorPanel;
