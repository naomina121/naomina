import React, { FC, ReactNode } from 'react';
import Header from './Header';
import Footer from './Footer';
import { LayoutProps } from '@/types/types';

const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <div className="container">
      <Header />
      <div className="box">
        <main>{children}</main>
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
