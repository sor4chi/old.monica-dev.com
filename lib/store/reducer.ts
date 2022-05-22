import { State, Action } from "./interfaces";

export const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case "TOGGLE_DARK_MODE":
      localStorage.setItem("isDarkMode", String(!state.isDarkMode));
      return {
        ...state,
        isDarkMode: !state.isDarkMode,
      };
    case "SET_DARK_MODE":
      localStorage.setItem("isDarkMode", String(action.isDarkMode));
      return {
        ...state,
        isDarkMode: action.isDarkMode,
      };
    default:
      return state;
  }
};
