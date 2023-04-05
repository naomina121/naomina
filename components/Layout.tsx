import React, { FC, ReactNode } from 'react';
import Header from './Header';
import Footer from './Footer';
import { LayoutProps } from '@/types/types';
import { useMediaQuery } from 'react-responsive';

const Layout: FC<LayoutProps> = ({ children }) => {
  const isBreakPoint = useMediaQuery({ query: `(max-width:1320px)` });
  return (
    <div className="container">
      <Header />
      <div className="box">
        <main id="main">{children}</main>
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
