export type State = {
  isDarkMode: boolean;
};
export type Action =
  | { type: "TOGGLE_DARK_MODE" }
  | { type: "SET_DARK_MODE"; isDarkMode: boolean };
