import { useRouter } from 'next/router';
import React from 'react';
import Link from 'next/link';

const SpNavgation = () => {
  return (
    <div className="hm">
      <input type="checkbox" id="hmCheck" className="hidden" />
      <label htmlFor="hmCheck" className="open-btn">
        <span></span>
        <span></span>
        <span></span>
      </label>
      <div className="hm-content">
        <p className="hm-title">コンテンツ</p>
        <nav>
          <ul>
            <li>
              <Link href="/">トップページ</Link>
            </li>
            <li>
              <Link href="/#about">当サイトについて</Link>
            </li>
            <li>
              <Link href="/#skils">現在のスキル</Link>
            </li>
            <li>
              <Link href="/study">学習記録</Link>
            </li>
            <li>
              <Link href="/privasy">プライバシーポリシー</Link>
            </li>
          </ul>
        </nav>
        <p className="hm-title">学習記録のカテゴリー</p>
        <nav>
          <ul>
            <li>
              <Link href="/study/it">IT知識</Link>
            </li>
            <li>
              <Link href="/study/server">サーバー</Link>
            </li>
            <li>
              <Link
                className="text-gray-400 duration-500 hover:text-gray-200  md:text-sm text-base"
                href="/study/security"
              >
                セキュリティ
              </Link>
            </li>
            <li>
              <Link href="/study/programming">プログラミング</Link>
            </li>
            <li>
              <Link href="/study/linux">Linux</Link>
            </li>
            <li>
              <Link href="/study/design">デザイン</Link>
            </li>
            <li>
              <Link href="/study/health">健康</Link>
            </li>
            <li>
              <Link href="/study/others">その他</Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default SpNavgation;

// <nav className="hidden xl:flex flex-col items-center max-w-xl w-full">
//   <ul className="flex flex-col list-none w-full items-center text-2xl font-['Montserrat',sans-serif] font-medium justify-around py-10">
//     <li className="mb-5">
//       <Link className="text-gray-300" href="/">
//         HOME
//       </Link>
//     </li>
//     <li className="mb-5">
//       <Link className="text-gray-300" href="/#about">
//         ABOUT
//       </Link>
//     </li>
//     <li className="mb-5">
//       <Link className="text-gray-300" href="/#skils">
//         SKILS
//       </Link>
//     </li>
//     <li className="mb-5">
//       <Link className="text-gray-300" href="/#contact">
//         CONTACT
//       </Link>
//     </li>
//     <li className="mb-5 w-full px-4 text-center">
//       <Link href="/study" className="text-center text-gray-300">
//         STUDY
//       </Link>
//     </li>
//   </ul>
//   <ul className="w-full mt-5 font-bold text-center py-4 border-dotted border-[1px] border-gray-300">
//     <li className="mb-5">
//       <Link
//         className="text-gray-400 duration-500 hover:text-gray-200 text-xl"
//         href="/study/ai"
//       >
//         AI
//       </Link>
//     </li>
//     <li className="mb-5">
//       <Link
//         className="text-gray-400 duration-500 hover:text-gray-200 text-xl"
//         href="/study/network"
//       >
//         ネットワーク
//       </Link>
//     </li>
//     <li className="mb-5">
//       <Link
//         className="text-gray-400 duration-500 hover:text-gray-200 text-xl"
//         href="/study/programming"
//       >
//         プログラミング
//       </Link>
//     </li>
//     <li className="mb-5">
//       <Link
//         className="text-gray-400 duration-500 hover:text-gray-200 text-xl"
//         href="/study/linux"
//       >
//         Linux
//       </Link>
//     </li>
//     <li className="mb-5">
//       <Link
//         className="text-gray-400 duration-500 hover:text-gray-200 text-xl"
//         href="/study/health"
//       >
//         健康
//       </Link>
//     </li>
//     <li>
//       <Link
//         className="text-gray-400 duration-500 hover:text-gray-200 text-xl"
//         href="/study/others"
//       >
//         その他
//       </Link>
//     </li>
//   </ul>
// </nav>;
