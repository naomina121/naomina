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
              <Link href="/#contact">お問い合わせ</Link>
            </li>
            <li>
              <Link href="/study">学習記録</Link>
            </li>
            <li>
              <Link href="/privacy">プライバシーポリシー</Link>
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
