import { Button, Panel, Placeholder } from "@vkontakte/vkui";
import React from "react";
import { Icon56ErrorOutline } from "@vkontakte/icons";
const ErrorPanel = ({getUser, ...props }) => {
    console.log("RENDERED IN DOCUMENT");
  return (
    <Panel centered {...props}>
      <Placeholder
        action={
          <Button onClick={() =>{getUser()}}size="l" mode="tertiary">
            Повторить попытку
          </Button>
        }
        icon={<Icon56ErrorOutline fill="var(--field_error_border)" />}
        header="Ошибка"
      >
        Вы были отключены от сервера
      </Placeholder>
    </Panel>
  );
};

export default ErrorPanel;
