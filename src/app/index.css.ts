import { vars } from "@/app/style/theme.css";
import { style } from "@vanilla-extract/css";

export const container = style({
  maxWidth: "1024px",
  margin: "0 auto",
});

export const title = style({
  fontSize: "2rem",
  fontWeight: 700,
  textAlign: "center",
  color: vars.color.text.primary,
  margin: "2rem 0",
});
