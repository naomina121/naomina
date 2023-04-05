import dateToTime from '@/hooks/dateToTime';
import { CardProps } from '@/types/types';
import 'remixicon/fonts/remixicon.css';
import {
  getCover,
  getDate,
  getForumla,
  getSelect,
  getText,
  getUpdate,
} from '@/utils/property';
import Image from 'next/image';
import Link from 'next/link';
import React, { FC } from 'react';

const Card: FC<CardProps> = ({ page, index }) => {
  let first = false;
  if (index < 2) {
    first = true;
  }

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
    <Link
      className="category flex"
      data-category={getForumla(page.properties.isJaCategory.formula)}
      data-cat={getSelect(page.properties.category.select)}
      href={
        '/study/' +
        getSelect(page.properties.category.select) +
        '/' +
        getText(page.properties.slug.rich_text)
      }
    >
      <div
        className={
          first
            ? 'hover:shadow-xl hover:-translate-y-2 bg-white rounded-xl w-full xl:max-w-fit max-w-[560px] overflow-hidden p-4 box-border shadow-md transition duration-500 ease-in-out mb-10'
            : 'hover:shadow-xl hover:-translate-y-2 rounded-xl shadow-md flex flex-col w-full max-w-[360px] xl:max-w-fit bg-white overflow-hidden p-4 box-border transition duration-500 ease-in-out mb-10'
        }
      >
        <Image
          src={getCover(page.cover)}
          alt={getText(page.properties.name.title)}
          width="1152"
          height="622"
          className="bg-gray-600"
        />
        <div>
          <div className="flex mt-3">
            <i className="xl:text-xs text-gray-400 text-sm ri-time-line"></i>
            <time
              className="text-sm xl:text-xs text-gray-400"
              itemProp="datepublished"
              dateTime={datePublished}
            >
              {published}
            </time>
            <i className="text-gray-400 xl:text-xs ml-2 text-sm ri-history-line"></i>
            <time
              className="text-gray-400 xl:text-xs text-sm"
              itemProp="modified"
              dateTime={dataUpdate}
            >
              {update}
            </time>
          </div>

          <p className="pt-2 font-bold text-gray-600">
            {getText(page.properties.name.title)}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default Card;
