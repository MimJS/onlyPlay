import { ScreenSpinner } from "@vkontakte/vkui";

const init = {
  activeModal: {
    profile: null,
    more: null,
  },
  activePopout: {
    rating: null,
    game: <ScreenSpinner size="medium" />,
    teams: <ScreenSpinner size="medium" />,
  },
  activeSnackbar: {
    more: null,
  },
  activeUnder: "profile",
  activeTopTeams: "top",
};

export const vkuiReducer = (state = init, action) => {
  switch (action.type) {
    case "updateModal":
      let arr = { ...state.activeModal };
      arr[action.payload.id] = action.payload.name;
      return { ...state, activeModal: arr };
    case "updatePopout":
      let pop = { ...state.activePopout };
      pop[action.payload.id] = action.payload.name;
      return { ...state, activePopout: pop };
    case "updateSnackbar":
      let snack = { ...state.activeSnackbar };
      snack[action.payload.id] = action.payload.name;
      return { ...state, activeSnackbar: snack };
    case "setActiveUnder":
      return { ...state, activeUnder: action.payload };
    case "setActiveTopTeams":
      return { ...state, activeTopTeams: action.payload };
    default:
      return state;
  }
};
