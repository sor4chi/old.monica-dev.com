import { createContext, Dispatch } from "react";
import { State, Action } from "./interfaces";

const Context = createContext<{
  state: State;
  dispatch: Dispatch<Action>;
}>({
  state: {
    isDarkMode: false,
  },
  dispatch: () => {},
});
export default Context;
