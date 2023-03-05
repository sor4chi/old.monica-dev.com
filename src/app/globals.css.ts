import { vars } from "@/app/constants/theme.css";
import { globalStyle } from "@vanilla-extract/css";

export const global = globalStyle("body", {
  margin: 0,
  backgroundColor: vars.color.bgDark.primary,
});
