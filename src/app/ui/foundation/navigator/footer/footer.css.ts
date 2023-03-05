import { vars } from "@/app/constants/theme.css";
import { style } from "@vanilla-extract/css";

export const container = style({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "100vw",
  padding: "1rem",
  boxSizing: "border-box",
  borderTop: `1px solid ${vars.color.text.secondary}`,
  background: "transparent",
});

export const copywrite = style({
  color: "white",
  fontSize: "1rem",
  fontWeight: 400,
  margin: 0,
  padding: 0,
});
