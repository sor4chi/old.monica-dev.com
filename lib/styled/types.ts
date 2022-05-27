import { common } from "./themes";

export interface ThemeType {
  variables: typeof common.variables;
  utils: typeof common.utils;
  colors: {
    text: string;
    subText: string;
    background: string;
    subBackground: string;
    subBackgroundAlpha: string;
    primary: string;
  };
}
