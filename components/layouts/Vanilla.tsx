import { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children, ...props }: LayoutProps) => {
  return (
    <>
      <main {...props}>{children}</main>
    </>
  );
};

export default Layout;
