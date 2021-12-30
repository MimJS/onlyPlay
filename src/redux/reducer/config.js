const init = {
  xhr_url: "http://localhost:8080/server/api.php",
  ws_url: "http://localhost:8080/",
  appId: 8020410,
  globalData: {},
  loading: false,
  errorData: {},
  lastGame: null,
  errorType: null,
  gameToken: null,
};

export const configReducer = (state = init, action) => {
  switch (action.type) {
    case "setGlobalData":
      return { ...state, globalData: action.payload };
    case "setLoading":
      return { ...state, loading: action.payload };
    case "setErrorData":
      return { ...state, errorData: action.payload };
    case "setLastGame":
      return { ...state, lastGame: action.payload };
    case "setErrorType":
      return { ...state, errorType: action.payload };
    case "setGameToken":
      return { ...state, gameToken: action.payload };
    default:
      return state;
  }
};
