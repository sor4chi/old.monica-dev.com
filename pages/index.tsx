import styled from "styled-components";
import { GetStaticProps } from "next";
import Link from "next/link";
import ArrowSVG from "components/svgs/Arrow";

const SectionContainer = styled.main`
  display: flex;
  justify-content: space-around;
  align-items: center;
  user-select: none;
  margin: 10rem 0;
`;

const MainTitleContainer = styled.div`
  display: flex;
  align-items: baseline;
`;

const MainTitle = styled.h1`
  font-weight: bold;
  font-size: 4.5rem;
  letter-spacing: 1rem;
  margin: 0;
  transition: 0.3s ease;
  position: relative;

  &::after {
    content: "";
    position: absolute;
    display: block;
    bottom: -1rem;
    left: 5%;
    width: 10%;
    height: 0.5rem;
    background: ${({ theme }) => theme.colors.primary};
  }
`;

const NavigationWrapper = styled.nav`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  gap: 1rem;
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
`;

const NavigationItemSubLabel = styled.span`
  color: ${({ theme }) => theme.colors.subText};
  font-size: 1rem;
`;

const NavigateContents = [
  {
    label: "Timeline",
    href: "/timeline",
    subLabel: "My History As Engineer.",
  },
  {
    label: "Works",
    href: "/works",
    subLabel: "My Works.",
  },
  {
    label: "Blog",
    href: "/blog",
    subLabel: "My Tech Blog.",
  },
  {
    label: "Contact",
    href: "/contact",
    subLabel: "Please contact me.",
  },
];

const Home = () => {
  return (
    <SectionContainer>
      <MainTitleContainer>
        <MainTitle>
          Monica&apos;s
          <br />
          Portfolio
        </MainTitle>
      </MainTitleContainer>
      <NavigationWrapper>
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
      </NavigationWrapper>
    </SectionContainer>
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
