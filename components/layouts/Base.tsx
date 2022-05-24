import Header from "components/Header";
import { ReactNode } from "react";
import { Main } from "./Main";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children, ...props }: LayoutProps) => {
  return (
    <>
      <Header />
      <Main {...props}>{children}</Main>
    </>
  );
};

export default Layout;
