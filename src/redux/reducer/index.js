import { combineReducers } from "redux";
import { userReducer } from "./user";
import { configReducer } from "./config";
import { vkuiReducer } from "./vkui";

export const rootReducer = combineReducers({
  config: configReducer,
  user: userReducer,
  ui: vkuiReducer,
});
