const init = {
  xhr_url: "https://e51b9a87f49724.localhost.run/server/api.php",
  appId: 8020410,
  globalData: {},
  loading: false,
  errorData: {},
};

export const configReducer = (state = init, action) => {
  switch (action.type) {
    case "setGlobalData":
      return { ...state, globalData: action.payload };
    case "setLoading":
      return { ...state, loading: action.payload };
    case "setErrorData":
      return { ...state, errorData: action.payload };
    default:
      return state;
  }
};
