import React from 'react';
import Navgation from './Navgation';
import { useRouter } from 'next/router';
import Link from 'next/link';
import SpNavgation from './SpNavgation';
import { useMediaQuery } from 'react-responsive';

const Header = () => {
  const isBreakPoint = useMediaQuery({ query: `(max-width:1320px)` });
  let router = useRouter();
  let current = router.pathname == '/';
  let siteTitle = () => {
    if (current) {
      return (
        <h1 className="text-white flex-end">
          <span className="text-amber-400 pr-2">NAO</span>BLOG
        </h1>
      );
    } else {
      return (
        <Link
          href="/"
          className="text-white font-black leading-tight tracking-wide text-4xl flex-end font-['Montserrat',sans-serif] hover:opacity-3"
        >
          <span className="text-amber-400 pr-2">NAO</span>BLOG
        </Link>
      );
    }
  };

  return (
    <header>
      <div className="fixed top-0 left-0 w-full z-30 bg-gray-900 h-[78px] leading-[1.5]">
        <div className="navigation max-w-screen-xl flex h-full justify-between items-center max-w-6xl flex-end m-auto xl:px-5">
          {siteTitle()}
          {isBreakPoint ? <SpNavgation /> : <Navgation />}
        </div>
      </div>
    </header>
  );
};

export default Header;
