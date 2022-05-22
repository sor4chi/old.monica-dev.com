import styled from "styled-components";
import { useContext } from "react";
import Context from "lib/store/context";

const Title = styled.h1`
  font-size: 50px;
  color: ${({ theme }) => theme.colors.primary};
`;

const Home = () => {
  const { dispatch } = useContext(Context);

  return (
    <>
      <Title>My page</Title>
      <button onClick={() => dispatch({ type: "TOGGLE_DARK_MODE" })}>
        Toggle
      </button>
    </>
  );
};

export default Home;
