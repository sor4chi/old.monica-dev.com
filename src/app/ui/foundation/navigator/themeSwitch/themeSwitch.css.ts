import { vars } from "@/style/theme.css";
import { style } from "@vanilla-extract/css";

export const themeSwitch = style({
  width: "2rem",
  height: "2rem",
  borderRadius: "50%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",

  border: "none",
  cursor: "pointer",

  background: vars.color.bg.secondary,

  ":hover": {
    opacity: 0.8,
  },
});

export const sun = style({
  color: vars.color.text.primary,
  display: "none",

  selectors: {
    ".dark &": {
      display: "block",
    },
  },
});

export const moon = style({
  color: vars.color.text.primary,
  display: "none",

  selectors: {
    ".light &": {
      display: "block",
    },
  },
});
