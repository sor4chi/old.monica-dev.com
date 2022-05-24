import styled from "styled-components";
import { GetStaticProps } from "next";
import Link from "next/link";
import ArrowSVG from "components/svgs/Arrow";
import { useState, useEffect } from "react";

const Section = styled.main`
  display: flex;
  justify-content: center;
  align-items: center;
  user-select: none;
  height: calc(100vh - ${({ theme }) => theme.variables.headerHeight} * 2);
  transition: 0.5s ease;
`;

const MainTitle = styled.h1`
  font-weight: bold;
  font-size: 4.5rem;
  letter-spacing: 1rem;
  margin: 0;
  transition: 0.3s ease;
  position: relative;
  background: linear-gradient(105.41deg, #b0dbe9 0%, #ffabe7 100%);
  -webkit-background-clip: text;
  color: transparent;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

interface NavigationProps {
  isAnimationStart: boolean;
}

const Navigation = styled.nav<NavigationProps>`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  padding-left: 5rem;
  gap: 1rem;
  width: ${({ isAnimationStart }) => (isAnimationStart ? "350px" : "0")};
  overflow: hidden;
  transition: 0.5s ease-in-out;
  white-space: nowrap;
`;

const NavigationItem = styled.a`
  cursor: pointer;
  color: ${({ theme }) => theme.colors.text};
  transition: all 0.3s ease;

  svg {
    fill: ${({ theme }) => theme.colors.text};
    transition: all 0.3s ease;
  }

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
    svg {
      fill: ${({ theme }) => theme.colors.primary};
    }
  }
`;

const NavigationItemLabel = styled.span`
  display: flex;
  align-items: center;
  font-size: 1.6rem;
  gap: 0.5rem;
`;

const NavigationItemSubLabel = styled.span`
  color: ${({ theme }) => theme.colors.subText};
  font-size: 1rem;
`;

const NavigateContents = [
  {
    label: "Timeline",
    href: "/timeline",
    subLabel: "My history as an engineer.",
  },
  {
    label: "Works",
    href: "/works",
    subLabel: "My works.",
  },
  {
    label: "Blog",
    href: "/blog",
    subLabel: "My tech blog.",
  },
  {
    label: "Contact",
    href: "/contact",
    subLabel: "Please contact me.",
  },
];

const Home = () => {
  const [isAnimationStart, setIsAnimationStart] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsAnimationStart(true);
    }, 1000);
  }, []);

  return (
    <Section>
      <MainTitle>
        Monica&apos;s
        <br />
        Portfolio
      </MainTitle>
      <Navigation isAnimationStart={isAnimationStart}>
        {NavigateContents.map((navigateContent) => (
          <Link href={navigateContent.href} key={navigateContent.label}>
            <NavigationItem>
              <NavigationItemLabel>
                {navigateContent.label}
                <ArrowSVG />
              </NavigationItemLabel>
              <NavigationItemSubLabel>
                {navigateContent.subLabel}
              </NavigationItemSubLabel>
            </NavigationItem>
          </Link>
        ))}
      </Navigation>
    </Section>
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
