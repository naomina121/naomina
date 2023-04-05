import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';

const Breadcrumb = () => {
  const router = useRouter();
  const paths = decodeURI(router.asPath).substring(1).split('/');
  const roots = [''];
  for (let i = 0; i < paths.length; i++) roots.push(roots[i] + '/' + paths[i]);

  return (
    <div className="w-full bg-white">
      <ul className="w-full max-w-6xl xl:px-10 mx-auto py-2 flex">
        <li>
          <Link
            className="text-sm text-sky-600 duration-500 hover:text-sky-700 font-medium"
            href="/"
          >
            home
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
                  {x}
                </Link>
              </li>
            );
          } else {
            return (
              <li key={i}>
                <span className="text-sm pl-4">&gt;</span>
                <span className="text-sm font-black text-gray-600 pl-4">
                  {x}
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
