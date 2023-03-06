import { vars } from "@/style/theme.css";
import { style } from "@vanilla-extract/css";

export const container = style({
  width: "100vw",
  boxSizing: "border-box",
  background: "transparent",
});

export const divider = style({
  height: 1,
  width: "100vw",
  background: vars.color.text.secondary,
  border: "none",
  opacity: 0.2,
  margin: 0,
});

export const copywrite = style({
  color: vars.color.text.secondary,
  fontSize: "1rem",
  fontWeight: 400,
  margin: 0,
  padding: "1rem",
  textAlign: "center",
});
