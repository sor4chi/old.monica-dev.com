import LightSVG from "components/svgs/Light";
import DarkSVG from "components/svgs/Dark";
import { useGlobalContext } from "lib/store/context";
import styled from "styled-components";

const ThemeToggleButtonContainer = styled.div`
  height: 2.5rem;
  width: 2.5rem;
  border-radius: 0.3rem;
  background: ${({ theme }) => theme.colors.subBackground};
  overflow: hidden;
`;

const ThemeToggleButtonInner = styled.div<{
  isDarkMode: boolean;
}>`
  display: flex;
  flex-direction: column;
  align-items: center;
  transform: translateY(${(props) => (props.isDarkMode ? "-50%" : "0")});
  transition: 0.5s ease;

  svg {
    fill: ${({ theme }) => theme.colors.text};
    width: 100%;
    height: 100%;
    padding: 0.3rem;
  }
`;

const ThemeToggleButton = () => {
  const { state, dispatch } = useGlobalContext();
  const { isDarkMode } = state;

  return (
    <ThemeToggleButtonContainer
      onClick={() => dispatch({ type: "TOGGLE_DARK_MODE" })}
    >
      <ThemeToggleButtonInner isDarkMode={isDarkMode}>
        <DarkSVG />
        <LightSVG />
      </ThemeToggleButtonInner>
    </ThemeToggleButtonContainer>
  );
};

export default ThemeToggleButton;
