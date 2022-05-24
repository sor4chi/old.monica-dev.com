import styled from "styled-components";
import { GetStaticProps } from "next";
import { useState } from "react";
import ArrowSVG from "components/svgs/Arrow";

const MainTitleContainer = styled.div<{ isAboutOpen: boolean }>`
  display: flex;
  flex-direction: ${(props) => (props.isAboutOpen ? "column" : "row")};
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.text};
  transition: 1s ease;
`;

const MainTitle = styled.h1<{ isAboutOpen: boolean }>`
  font-size: ${(props) => (props.isAboutOpen ? "5rem" : "1.5rem")};
  font-weight: bold;
  letter-spacing: 1rem;
  margin: 0;
  transition: 1s ease;
`;

const AboutOpener = styled.span<{ isAboutOpen: boolean }>`
  font-size: 1.4rem;
  font-weight: bold;
  display: flex;
  align-items: center;
  cursor: pointer;
  transition: 1s ease;

  svg {
    fill: ${({ theme }) => theme.colors.text};
    transform: ${(props) =>
      props.isAboutOpen ? "rotate(90deg)" : "rotate(-90deg)"};
  }
`;

const Home = () => {
  const [isAboutOpen, setIsAboutOpen] = useState(false);

  return (
    <>
      <MainTitleContainer isAboutOpen={isAboutOpen}>
        <MainTitle isAboutOpen={isAboutOpen}>
          Monica&apos;s
          <br />
          Portfolio
        </MainTitle>
        <AboutOpener
          onClick={() => setIsAboutOpen(!isAboutOpen)}
          isAboutOpen={isAboutOpen}
        >
          About
          <ArrowSVG />
        </AboutOpener>
      </MainTitleContainer>
    </>
  );
};

export default Home;

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {
      title: "Top",
      description: "This is description",
      layout: "Base",
    },
  };
};
