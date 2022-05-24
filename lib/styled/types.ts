import { commonVariables } from "./themes";

export interface ThemeType {
  variables: typeof commonVariables;
  colors: {
    text: string;
    subText: string;
    background: string;
    subBackground: string;
    primary: string;
  };
}
