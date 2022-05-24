import Link from "next/link";
import styled from "styled-components";
import LogoSVG from "./svgs/Logo";
import { useRouter } from "next/router";
import ThemeToggleButton from "./buttons/ThemeToggle";

const HeaderContainer = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 10vw;
  user-select: none;
  height: ${({ theme }) => theme.variables.headerHeight};

  svg {
    fill: ${({ theme }) => theme.colors.text};
    width: 100%;
    height: 100%;
  }
`;

const LogoContainer = styled.div`
  width: 10rem;
  height: calc(100% - 1.6rem);
  margin: 0.8rem 0;
`;

const Navigation = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;

  gap: 3rem;
`;

interface NavigationItemProps {
  isActive: boolean;
}

const NavigationItem = styled.a<NavigationItemProps>`
  color: ${({ theme }) => theme.colors.text};
  border-bottom: 0.2rem solid;
  font-size: 1.4rem;
  cursor: pointer;
  border-color: ${({ isActive, theme }) => {
    if (isActive) {
      return theme.colors.text;
    } else {
      return theme.colors.background;
    }
  }};
  &:hover {
    color: ${({ theme }) => theme.colors.primary};
    border-color: ${({ isActive, theme }) => {
      if (isActive) {
        return theme.colors.primary;
      } else {
        return theme.colors.background;
      }
    }};
  }
`;

const NavigationItems = [
  {
    href: "/",
    label: "Home",
    activePaths: ["/"],
  },
  {
    href: "/timeline",
    label: "Timeline",
    activePaths: ["/timeline"],
  },
  {
    href: "/works",
    label: "Works",
    activePaths: ["/works", "/works/[workId]"],
  },
  {
    href: "/blog",
    label: "Blog",
    activePaths: ["/blog", "/blog/[slug]"],
  },
  {
    href: "/contact",
    label: "Contact",
    activePaths: ["/contact", "/contact/success"],
  },
];

const Header = () => {
  const path = useRouter().pathname;
  const judgeIsNavActive = (activePaths: string[]) => {
    return activePaths.some((activePath) => activePath === path);
  };

  return (
    <HeaderContainer>
      <LogoContainer>
        <LogoSVG />
      </LogoContainer>
      <Navigation>
        {NavigationItems.map(({ href, label, activePaths }) => (
          <Link href={href} key={href}>
            <NavigationItem isActive={judgeIsNavActive(activePaths)}>
              {label}
            </NavigationItem>
          </Link>
        ))}
        <ThemeToggleButton />
      </Navigation>
    </HeaderContainer>
  );
};

export default Header;
