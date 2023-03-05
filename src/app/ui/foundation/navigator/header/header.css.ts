import { vars } from "@/app/constants/theme.css";
import { style } from "@vanilla-extract/css";

export const container = style({
  width: "100vw",
  height: vars.size.headerHeight,
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "0 calc((100vw - 1000px) / 2)",
  position: "fixed",
  top: 0,
  left: 0,
  zIndex: 1,
  boxSizing: "border-box",
  background: "transparent",
  borderBottom: `1px solid ${vars.color.text.secondary}`,
  backdropFilter: "blur(.5rem)",
});

export const navigationList = style({
  listStyleType: "none",
  padding: 0,
  margin: 0,
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: 20,
  height: "100%",
});

export const navigationListItem = style({
  display: "inline-block",
});

export const navigationLink = style({
  color: vars.color.textDark.primary,
  fontSize: "1rem",
  fontWeight: 400,
  textDecoration: "none",
  transition: "color .2s ease-in-out",
  ":hover": {
    color: vars.color.textDark.secondary,
  },
});
