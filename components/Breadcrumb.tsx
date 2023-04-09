import { BreadcrumbProps } from '@/types/types';
import Link from 'next/link';
import React, { FC } from 'react';

const Breadcrumb: FC<BreadcrumbProps> = ({ breadList, breadListJs}) => {
  const str = String(breadList);
  const str2 = String(breadListJs);
  const paths = str.split('/');
  const paths2 = str2.split('/')
  const roots = [''];
  for (let i = 0; i < paths.length; i++) roots.push(roots[i] + '/' + paths[i]);

  return (
    <div className="w-full bg-white">
      <ul className="w-full max-w-6xl xl:px-10 mx-auto py-2 flex justify-start items-center">
        <li>
          <Link
            className="text-sm text-sky-600 duration-500 hover:text-sky-700 font-medium"
            href="/"
          >
            トップページ
          </Link>
        </li>
        {paths.map((x, i) => {
          if (paths.length - 1 !== i) {
            return (
              <li key={i}>
                <span className="text-sm pl-4">&gt;</span>
                <Link
                  className="text-sm ml-4 text-sky-600 duration-500 hover:text-sky-700 font-medium"
                  href={roots[i + 1]}
                  key={i}
                >
                  {paths2[i]}
                </Link>
              </li>
            );
          } else {
            return (
              <li key={i}>
                <span className="text-sm pl-4">&gt;</span>
                <span className="text-sm font-black text-gray-600 pl-4">
                  {paths2[i]}
                </span>
              </li>
            );
          }
        })}
      </ul>
    </div>
  );
};
export default Breadcrumb;
