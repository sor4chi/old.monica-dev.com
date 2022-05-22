import { createContext, useContext, Dispatch } from "react";
import { State, Action } from "./interfaces";

const Context = createContext<
  | {
      state: State;
      dispatch: Dispatch<Action>;
    }
  | undefined
>(undefined);
export default Context;

export const useGlobalContext = () => {
  const context = useContext(Context);
  if (context === undefined) {
    throw new Error("useGlobalContext must be used within a GlobalProvider");
  }
  return context;
};
