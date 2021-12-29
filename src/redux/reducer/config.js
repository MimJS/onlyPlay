const init = {
  xhr_url: "https://4f28c6478822d6.localhost.run/server/api.php",
  globalData: {},
  loading: false
};

export const configReducer = (state = init, action) => {
  switch (action.type) {
    case "setGlobalData":
      return { ...state, globalData: action.payload };
    case "setLoading":
      return { ...state, loading: action.payload };
    case "setTheme":
      let scheme = action.payload != null ? action.payload : "inherit";
      return { ...state, theme: scheme };
    default:
      return state;
  }
};
