import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { store } from "./redux";
import { Provider } from "react-redux";
import bridge from "@vkontakte/vk-bridge";

bridge.send("VKWebAppInit");

bridge.subscribe(({ detail: { type, data } }) => {
  if (type === "VKWebAppUpdateConfig") {
    console.log(data);
    document.body.setAttribute(
      "scheme",
      data.scheme ? data.scheme : "client_light"
    );
  }
});

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);