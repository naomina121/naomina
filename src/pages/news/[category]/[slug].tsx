import { useMediaQuery } from 'react-responsive';
import Breadcrumb from '@/components/Breadcrumb';
import Layout from '@/components/Layout';
import { ArticleProps, Params } from '@/types/types';
import { fetchNewsBlocksByPageId, fetchNewsPages } from '@/utils/notion';
import { getSelect, getDate, getText, getForumla } from '@/utils/property';

import { GetStaticPaths, GetStaticProps } from 'next';
import React, { FC } from 'react';
import dateToTime from '@/hooks/dateToTime';
import Toc from '@/components/post/Toc';
import Seo from '@/components/Seo';
import { siteConfig } from '@/site.config';
import MainToc from '@/components/post/MainToc';
import Author from '@/components/post/Author';
import Html from '@/components/post/Html';

export const getStaticProps: GetStaticProps = async (ctx) => {
  const { slug } = ctx.params as Params;
  const { results: slugContent } = await fetchNewsPages({ slug: slug });
  const page = slugContent[0];
  const pageId = page.id;
  const { results: blocks } = await fetchNewsBlocksByPageId(pageId);
  return {
    props: {
      page: page,
      blocks: blocks,
    },
    revalidate: 10,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking',
  };
};

const Article: FC<ArticleProps> = ({ page, blocks }) => {
  const isBreakPoint = useMediaQuery({ query: `(max-width:1320px)` });

  const datePublished = dateToTime(
    getDate(page.properties.published.date),
    'YYYY-MM-DD'
  );

  const published = dateToTime(
    getDate(page.properties.published.date),
    'YYYY年MM月DD日'
  );

  return (
    <Layout>
      <Seo
        pageTitle={getText(page.properties.name.title)}
        pageDescription={getText(page.properties.description.rich_text)}
        pagePath={`${siteConfig.siteUrl}news/${getSelect(
          page.properties.category.select
        )}/${getForumla(page.properties.newsSlug.formula)}`}
      />
      <div className="pt-[98px] xl:px-5 w-full bg-gray-200">
        <div className="w-full max-w-6xl xl:max-w-4xl mx-auto lg:py-5 lg:pt-0 flex justify-between py-10">
          <div className=" bg-white xl:max-w-4xl xl:mx-auto w-full max-w-3xl shadow-md post rounded-md">
            <div className="p-10 xl:p-5 xl:pb-0 pt-7 pb-0">
              <div className="flex items-center justify-between meta md:flex-col md:items-start">
                {/* time */}
                <div className="flex items-center justify-start xl:mb-2">
                  <i className="text-gray-500 text-sm ri-time-line lg:text-xs"></i>
                  <time
                    className="text-sm text-gray-500 lg:text-xs"
                    itemProp="datepublished"
                    dateTime={datePublished}
                  >
                    {published}
                  </time>
                </div>
                {/* category */}
                <div className="flex justify-start">
                  <p className="m-0 p-0 flex">
                    <span
                      className={
                        getSelect(page.properties.category.select) +
                        ' text-xs p-1 border-[1px] px-2 xl:text-[12px] text-white rounded-sm'
                      }
                    >
                      {getForumla(page.properties.isJaCategory.formula)}
                    </span>
                  </p>
                </div>
              </div>
              <h1 className="mt-3 w-full text-3xl xl:mb-3 xl:text-xl pb-3 mb-8 border-b-[1px] border-gray-300 md:text-[18px]">
                {getText(page.properties.name.title)}
              </h1>
            </div>
            <div className="p-10 xl:p-5 py-0 context">
              {isBreakPoint ? <MainToc /> : <></>}
              <Html blocks={blocks} />
            </div>
            <div className="my-10 xl:px-5 px-10 xl:mb-0">
              <Author />
            </div>
          </div>
          <div className="xl:hidden aside w-full max-w-xs">
            {/* 目次 */}
            <Toc />
          </div>
        </div>
      </div>
      <Breadcrumb
        breadList={`news/${getSelect(
          page.properties.category.select
        )}/${getForumla(page.properties.newsSlug.formula)}`}
        breadListJs={`お知らせ一覧/${getForumla(
          page.properties.isJaCategory.formula
        )}/${getText(page.properties.name.title)}`}
      />
    </Layout>
  );
};

export default Article;
