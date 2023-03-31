import { CardProps } from '@/types/types';
import Image from 'next/image';
import Link from 'next/link';
import React, { FC } from 'react';

const Card: FC<CardProps> = ({ page, index }) => {
  let first = false;
  if (index < 2) {
    first = true;
  }
  return (
    <Link
      className="category"
      data-category={page.category}
      href={'/study/' + page.category + '/' + page.slug}
    >
      <div
        className={
          first
            ? 'bg-white rounded-xl w-full max-w-[496px] overflow-hidden p-4 mb-10 box-border shadow-md'
            : 'rounded-xl object-cover shadow-md flex flex-col max-w-xs w-full bg-white mb-10 overflow-hidden p-4 min-h-[320px] box-border'
        }
      >
        <Image
          src="/img/about.jpg"
          alt={page.name}
          width={first ? '640' : '320'}
          height={first ? '360' : '180'}
          className="bg-gray-600"
        />
        <time className="text-base text-gray-400 mt-2" dateTime={page.update}>
          {page.update}
        </time>
        <p className="pt-4 font-bold text-gray-600">{page.name}</p>
      </div>
    </Link>
  );
};

export default Card;
