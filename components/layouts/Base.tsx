import Header from "components/Header";
import { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children, ...props }: LayoutProps) => {
  return (
    <>
      <Header />
      <main {...props}>{children}</main>
    </>
  );
};

export default Layout;
