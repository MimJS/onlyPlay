const init = {
  xhr_url: "https://aaacf166847d8f.localhost.run/server/api.php",
  ws_url: "https://aaacf166847d8f.localhost.run",
  appId: 8020410,
  globalData: {},
  loading: false,
  errorData: {},
  lastGame: null,
  errorType: null,
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
    default:
      return state;
  }
};
