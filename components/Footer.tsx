import { siteConfig } from '@/site.config';
import Link from 'next/link';
import React from 'react';
import 'remixicon/fonts/remixicon.css';

const Footer = () => {
  return (
    <footer className="py-4 bg-gray-900">
      <div className="max-w-5xl w-full my-5 py-5 mx-auto border-solid border-b-[1px] border-gray-700">
        <nav>
          <ul className="footer-menu flex items-center">
            <li>
              <Link className="text-gray-300 mr-5 text-base" href="/">
                トップページ
              </Link>
            </li>
            <li>
              <Link className="text-gray-300 mr-5 text-base" href="/#about">
                当サイトについて
              </Link>
            </li>
            <li>
              <Link className="text-gray-300 mr-5 text-base" href="/#skils">
                スキルについて
              </Link>
            </li>
            <li>
              <Link className="text-gray-300 mr-5 text-base" href="/#study">
                学習記録
              </Link>
            </li>
            <li>
              <Link className="text-gray-300 mr-5 text-base" href="/#contact">
                お問い合わせ
              </Link>
            </li>
            <li>
              <Link className="text-gray-400 text-sm" href="/privasy-policy">
                プライバシーポリシー
              </Link>
            </li>
          </ul>
        </nav>
      </div>
      <div className="max-w-5xl w-full my-5 py-5 mx-auto">
        <div className="text-3xl font-['Montserrat',sans-serif] font-black text-white flex-end">
          <span className="font-['Montserrat',sans-serif] text-amber-400 pr-2">
            NAO
          </span>
          BLOG
        </div>
        <div className="flex my-5">
          <Link href={siteConfig.twitterUrl} target="_blank">
            <i className="rounded-full p-1 bg-gray-700 ri-twitter-fill text-gray-300 text-3xl mr-4 hover:text-white hover:bg-[#1DA1F2]"></i>
          </Link>
          <Link href={siteConfig.githubUrl} target="_blank">
            <i className="rounded-full p-1 bg-gray-700 ri-github-fill text-gray-300 text-3xl hover:text-white hover:bg-[#2dba4e]"></i>
          </Link>
        </div>
      </div>
      <small className="text-white/80 block w-full mx-auto max-w-5xl">
        © 2023 {siteConfig.title}
      </small>
    </footer>
  );
};

export default Footer;
