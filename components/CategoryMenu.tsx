import Link from 'next/link';
import React from 'react';

const CategoryMenu = () => {
  return (
    <div className="mt-[78px] xl:hidden w-full bg-gray-800">
      <ul className="w-full max-w-6xl mx-auto py-2 xl:px-10 flex">
        <li className="mr-4">
          <Link
            className="text-gray-400 duration-500 hover:text-gray-200 md:text-sm text-base"
            href="/study/ai"
          >
            AI
          </Link>
        </li>
        <li className="mr-4">
          <Link
            className="text-gray-400 duration-500 hover:text-gray-200  md:text-sm text-base"
            href="/study/network"
          >
            ネットワーク
          </Link>
        </li>
        <li className="mr-4">
          <Link
            className="text-gray-400 duration-500 hover:text-gray-200 text-base md:text-sm"
            href="/study/programming"
          >
            プログラミング
          </Link>
        </li>
        <li className="mr-4">
          <Link
            className="text-gray-400 duration-500 hover:text-gray-200 text-base md:text-sm"
            href="/study/linux"
          >
            Linux
          </Link>
        </li>
        <li className="mr-4">
          <Link
            className="text-gray-400 duration-500 hover:text-gray-200 text-base md:text-sm"
            href="/study/health"
          >
            健康
          </Link>
        </li>
        <li>
          <Link
            className="text-gray-400 duration-500 hover:text-gray-200 text-base md:text-sm"
            href="/study/others"
          >
            その他
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default CategoryMenu;
