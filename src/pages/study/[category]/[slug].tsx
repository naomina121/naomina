import { useMediaQuery } from 'react-responsive';
import 'clipboard';
import prism from 'prismjs';
import 'prism-themes/themes/prism-dracula.css';
import parse from 'html-react-parser';
import { NotionBlocksHtmlParser } from '@notion-stuff/blocks-html-parser';
import Breadcrumb from '@/components/Breadcrumb';
import Layout from '@/components/Layout';
import { ArticleProps, Params } from '@/types/types';
import { fetchBlocksByPageId, fetchPages } from '@/utils/notion';
import {
  getSelect,
  getCover,
  getDate,
  getMultiSelect,
  getText,
  getUpdate,
  getForumla,
} from '@/utils/property';

import { GetServerSideProps } from 'next';
import Image from 'next/image';
import React, { FC, useEffect } from 'react';
import CategoryMenu from '@/components/CategoryMenu';
import dateToTime from '@/hooks/dateToTime';
import Link from 'next/link';
import Sns from '@/components/post/Sns';
import Toc from '@/components/post/Toc';
import Seo from '@/components/Seo';
import { siteConfig } from '@/site.config';
import MainToc from '@/components/post/MainToc';

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { slug } = ctx.params as Params;
  const { results } = await fetchPages({ slug: slug });
  if (!results.length) {
    return {
      notFound: true,
    };
  }
  const page = results[0];
  const pageId = page.id;
  const { results: blocks } = await fetchBlocksByPageId(pageId);
  return {
    props: {
      page: page,
      blocks: blocks,
    },
  };
};

const Article: FC<ArticleProps> = ({ page, blocks }) => {
  const isBreakPoint = useMediaQuery({ query: `(max-width:1320px)` });

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

  const SyntaxHighlighter = (code: any, language: string) => {
    require('prismjs/plugins/toolbar/prism-toolbar.min.css');
    require('prismjs/plugins/toolbar/prism-toolbar.min');
    require('prismjs/plugins/copy-to-clipboard/prism-copy-to-clipboard.min');
    require('prismjs/plugins/show-language/prism-show-language');
    useEffect(() => {
      prism.highlightAll();
    }, []);
    return code;
  };

  const CustomNotion = NotionBlocksHtmlParser.getInstance({
    mdParserOptions: {
      imageAsFigure: true,
      emptyParagraphToNonBreakingSpace: true,
    },
    mdToHtmlOptions: {
      pedantic: false,
      gfm: true,
      breaks: false,
      sanitize: false,
      smartLists: true,
      smartypants: false,
      xhtml: false,
      langPrefix: 'language-',
    },
    mdHighlightingOptions(code, lang, callback: any) {
      callback = SyntaxHighlighter;
      const language = lang;
      return callback(code, language);
    },
  });

  const notionToHtml = CustomNotion.parse(blocks);
  const html = parse(notionToHtml);

  return (
    <Layout>
      <Seo
        pageTitle={getText(page.properties.name.title)}
        pageImg={getCover(page.cover)}
        pageImgWidth={1152}
        pageImgHeight={622}
        pagePath={`${siteConfig.siteUrl}study/${getSelect(
          page.properties.category.select
        )}/${getText(page.properties.slug.rich_text)}`}
      />
      <CategoryMenu />
      <div className="xl:pt-[78px] w-full bg-gray-200">
        <div className="w-full max-w-6xl mx-auto xl:p-5 flex justify-between py-10">
          <div className=" bg-white xl:max-w-4xl xl:mx-auto w-full max-w-3xl shadow-md post">
            <div className="p-10 xl:p-5 pt-7 pb-0">
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
                  <i className="text-gray-500 lg:text-xs ml-2 text-sm ri-history-line"></i>
                  <time
                    className="text-gray-500 lg:text-xs text-sm"
                    itemProp="modified"
                    dateTime={dataUpdate}
                  >
                    {update}
                  </time>
                </div>
                {/* category */}
                <div className="flex justify-start">
                  <p className="m-0 p-0 flex">
                    <span
                      className={
                        getSelect(page.properties.category.select) +
                        ' text-xs p-1 border-[1px] px-2 xl:text-[6px] text-gray-300 rounded-sm'
                      }
                    >
                      {getForumla(page.properties.isJaCategory.formula)}
                    </span>
                  </p>
                  {/* tag */}
                  <p className="m-0 p-0 ml-2 flex">
                    {getMultiSelect(page.properties.tags.multi_select).map(
                      (tag: string, index: number) => (
                        <Link
                          key={index}
                          className="text-xs p-1 px-2 m-0 rounded-sm text-gray-400 font-medium mr-2 xl:text-[6px] hover:text-gray-600  border-[1px]
                          border-gray-400 align-middle"
                          href={
                            '/tag/' +
                            getMultiSelect(page.properties.tags.multi_select)
                          }
                        >{`#${tag} `}</Link>
                      )
                    )}
                  </p>
                </div>
              </div>
              <h1 className="mt-3 mb-5 w-full text-3xl xl:text-xl">
                {getText(page.properties.name.title)}
              </h1>
            </div>
            <Image
              src={getCover(page.cover)}
              width="768"
              height="360"
              alt="about"
              className="object-cover w-full mb-10 xl:mb-0"
            />
            <div className="p-10 xl:p-5 py-0 context">
              {isBreakPoint ? <MainToc /> : <></>}
              {html}
            </div>
            <div className="my-10 xl:px-5 px-10 xl:mb-0">
              <Sns page={page} />
              <div className="border-[1px] p-4 border-gray-300 my-10 xl:my-5">
                <h2 className="border-b-[1px] border-gray-300">
                  この記事を書いた人
                </h2>
                <div className="mt-4 flex items-center justify-between xl:flex-col">
                  <Image
                    src="/img/author.jpg"
                    alt="ナオ"
                    width="125"
                    height="125"
                    className="rounded-full sm:max-w-sm"
                  />
                  <div className="w-full p-4">
                    <h3>ナオ</h3>
                    <p>
                      プログラミングが好きで、寝食を忘れてしまう普通の人です。
                    </p>
                    <p>
                      希少価値のあるエンジニアを目指せたらという思いで、幅広くIT知識を学習しています。
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="xl:hidden aside w-full max-w-xs">
            {/* 目次 */}
            <Toc />
          </div>
        </div>
      </div>
      <Breadcrumb
        breadList={`study/${getSelect(
          page.properties.category.select
        )}/${getText(page.properties.slug.rich_text)}`}
        breadListJs={`学習記録/${getForumla(
          page.properties.isJaCategory.formula
        )}/${getText(page.properties.name.title)}`}
      />
    </Layout>
  );
};

export default Article;
