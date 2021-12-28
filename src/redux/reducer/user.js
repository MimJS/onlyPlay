const init = {
  db: {},
  vk: {},
  rating: {},
  token: null,
};

export const userReducer = (state = init, action) => {
  switch (action.type) {
    case "setNewDb":
      return { ...state, db: action.payload };
    case "setNewVk":
      return { ...state, vk: action.payload };
    case "setRating":
      return { ...state, rating: action.payload };
    case "setUserToken":
      console.log(action.payload);
      return { ...state, token: action.payload };
    case "updateRating":
      let rat = { ...state.rating };
      rat[action.payload.type] = action.payload.data;
      return { ...state, rating: rat };
    default:
      return state;
  }
};
