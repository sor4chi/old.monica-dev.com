import LightSVG from "components/svgs/Light";
import DarkSVG from "components/svgs/Dark";
import { useGlobalContext } from "lib/store/context";
import styled from "styled-components";
import { useCallback } from "react";

const ThemeToggleButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 2.5rem;
  width: 2.5rem;
  padding: 0.3rem;
  border-radius: 0.3rem;
  background: ${({ theme }) => theme.colors.subBackground};

  svg {
    fill: ${({ theme }) => theme.colors.text};
    width: 100%;
    height: 100%;
  }
`;

const ThemeToggleButton = () => {
  const { state, dispatch } = useGlobalContext();
  const { isDarkMode } = state;

  return (
    <ThemeToggleButtonContainer
      onClick={() => dispatch({ type: "TOGGLE_DARK_MODE" })}
    >
      {isDarkMode ? <DarkSVG /> : <LightSVG />}
    </ThemeToggleButtonContainer>
  );
};

export default ThemeToggleButton;
