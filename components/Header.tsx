import React from 'react';
import Navgation from './Navgation';

const Header = () => {
  return (
    <header>
      <div className="fixed top-0 left-0 w-full z-30 bg-gray-900 h-[78px] leading-[1.5]">
        <div className="max-w-screen-xl flex h-full justify-between items-center flex-end m-auto">
          <h1 className="text-white flex-end">
            <span className="text-amber-400 pr-2">NAO</span>BLOG
          </h1>
          <Navgation />
        </div>
      </div>
    </header>
  );
};

export default Header;
