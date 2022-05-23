import Link from "next/link";
import styled from "styled-components";
import LogoSVG from "./svgs/Logo";
import { useRouter } from "next/router";

const HeaderContainer = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 10vw;
  height: 80px;

  svg {
    fill: ${({ theme }) => theme.colors.text};
    width: 100%;
    height: 100%;
  }
`;

const LogoContainer = styled.div`
  width: 10rem;
  height: calc(100% - 20px);
  margin: 10px 0;
`;

const Navigation = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;

  gap: 20px;
`;

const NavigationItem = styled.a<{
  isActive: boolean;
}>`
  color: ${({ theme }) => theme.colors.text};
  border-bottom: ${({ isActive }) => (isActive ? `2px solid` : "none")};
  font-size: 1.4rem;
  cursor: pointer;
  border-color: ${({ theme }) => theme.colors.text};
  &:hover {
    color: ${({ theme }) => theme.colors.primary};
    border-color: ${({ theme }) => theme.colors.primary};
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
      </Navigation>
    </HeaderContainer>
  );
};

export default Header;
