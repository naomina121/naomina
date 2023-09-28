import dateToTime from '@/hooks/dateToTime';
import { CardProps } from '@/types/types';
import 'remixicon/fonts/remixicon.css';
import {
  getDate,
  getForumla,
  getMultiSelect,
  getSelect,
  getText,
  getUpdate,
} from '@/utils/property';
import Image from 'next/image';
import Link from 'next/link';
import React, { FC } from 'react';

const List: FC<CardProps> = ({ page, index }) => {
  const url = `../../api/image/${getSelect(
    page.properties.category.select
  )}/${getText(page.properties.slug.rich_text)}/?slug=${getText(
    page.properties.slug.rich_text
  )}&cat=${getSelect(page.properties.category.select)}`;

  const dataUpdate = dateToTime(
    getUpdate(page.properties.update.last_edited_time),
    'YYYY-MM-DD'
  );

  const datePublished = dateToTime(
    getDate(page.properties.published.date),
    'YYYY-MM-DD'
  );

  const update = dateToTime(
    getUpdate(page.properties.update.last_edited_time),
    'YYYY年MM月DD日'
  );

  const published = dateToTime(
    getDate(page.properties.published.date),
    'YYYY年MM月DD日'
  );

  return (
    <div
      className="category list md:max-w-full w-full xl:px-10 hover:opacity-80"
      data-category={getForumla(page.properties.isJaCategory.formula)}
      data-cat={getSelect(page.properties.category.select)}
    >
      <div className="rounded-xl md:flex-col shadow-md flex flex-wrap max-w-full w-full md:max-w-full bg-white mb-10 overflow-hidden p-4 box-border">
        <Link
          href={
            '/study/' +
            getSelect(page.properties.category.select) +
            '/' +
            getText(page.properties.slug.rich_text)
          }
        >
          <Image
            src={url}
            alt={getText(page.properties.name.title)}
            width="1152"
            height="622"
            className="bg-gray-600 lg:max-w-[300px] md:max-w-full max-w-xs object-cover mr-4 md:mr-0"
          />
        </Link>
        <div className="anime-dev">
          <div className="flex mt-3">
            <i className="text-gray-400 xl:text-xs text-sm ri-time-line"></i>
            <time
              className="text-sm xl:text-xs text-gray-400"
              itemProp="datepublished"
              dateTime={datePublished}
            >
              {published}
            </time>
            <i className="text-gray-400 xl:text-xs ml-2 text-sm ri-history-line"></i>
            <time
              className="xl:text-xs text-gray-400 text-sm"
              itemProp="modified"
              dateTime={dataUpdate}
            >
              {update}
            </time>
          </div>
          <h2 className="pt-2 text-lg font-extrabold md:text-base text-gray-600">
            <Link
              href={
                '/study/' +
                getSelect(page.properties.category.select) +
                '/' +
                getText(page.properties.slug.rich_text)
              }
            >
              {getText(page.properties.name.title)}
            </Link>
          </h2>
          <p className="m-0">
            {getMultiSelect(page.properties.tags.multi_select).map(
              (tag: string, index: number) => (
                <Link
                  key={index}
                  className="text-xs p-1 px-2 m-0 rounded-sm text-gray-400 font-medium mr-2 hover:text-gray-600  border
                  border-gray-400 align-middle"
                  href={`/tag/${tag}`}
                >{`#${tag}`}</Link>
              )
            )}
          </p>
        </div>
      </div>
    </div>
  );
};

export default List;
