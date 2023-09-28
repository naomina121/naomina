import dateToTime from '@/hooks/dateToTime';
import { CardProps } from '@/types/types';
import 'remixicon/fonts/remixicon.css';
import {
  getDate,
  getForumla,
  getSelect,
  getText,
} from '@/utils/property';
import Image from 'next/image';
import Link from 'next/link';
import React, { FC } from 'react';

const NewsList: FC<CardProps> = ({ page, index }) => {

  const datePublished = dateToTime(
    getDate(page.properties.published.date),
    'YYYY-MM-DD'
  );

  const published = dateToTime(
    getDate(page.properties.published.date),
    'YYYY年MM月DD日'
  );

  return (
    <div className="list md:max-w-full w-full xl:px-0">
      <div className="rounded-xl md:flex-col shadow-md flex flex-wrap max-w-full w-full md:max-w-full bg-white mb-10 overflow-hidden p-4 box-border">
        <div className="">
          <div className="flex items-center mt-3">
            <p
              className={
                getSelect(page.properties.category.select) +
                ' text-[12px] w-full max-w-[120px] text-center px-1 py-[2px] m-0 mr-3 text-white rounded hover:opacity-80'
              }
            >
              <Link
                href={
                  '/news/' +
                  getSelect(page.properties.category.select)
                }
              >
                {getForumla(page.properties.isJaCategory.formula)}
              </Link>
            </p>

            <i className="text-gray-400 text-[14px] ri-time-line"></i>
            <time
              className="text-[14px] text-gray-400"
              itemProp="datepublished"
              dateTime={datePublished}
            >
              {published}
            </time>
          </div>
          <h2 className="pt-3 text-lg font-extrabold md:text-base hover:opacity-80 text-gray-600">
            <Link
              href={
                '/news/' +
                getSelect(page.properties.category.select) +
                '/' +
                getForumla(page.properties.newsSlug.formula)
              }
            >
              {getText(page.properties.name.title)}
            </Link>
          </h2>
          <p className="pt-0 text-sm md:text-xs">
            {getText(page.properties.description.rich_text)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default NewsList;
