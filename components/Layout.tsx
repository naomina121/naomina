import React, { FC, ReactNode } from 'react';
import Header from './Header';
import Footer from './Footer';
import { LayoutProps } from '@/types/types';

const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <div>
      <Header />
      <main id="main" className="top-[0px] mt-[0px] relative">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
