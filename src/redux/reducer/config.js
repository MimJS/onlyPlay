const init = {
  xhr_url: "https://59c7a0d6dacb47.localhost.run/server/api.php",
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
