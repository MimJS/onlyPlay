const init = {
  xhr_url: "https://e714596638a012.localhost.run/server/api.php",
  globalData: {},
  loading: false,
};

export const configReducer = (state = init, action) => {
  switch (action.type) {
    case "setGlobalData":
      return { ...state, globalData: action.payload };
    case "setLoading":
      return { ...state, loading: action.payload };
    default:
      return state;
  }
};
