const init = {
  xhr_url: "https://18d084e3999724.localhost.run/server/api.php",
  globalData: {},
  loading: false,
  theme: "bright_light",
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
