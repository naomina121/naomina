const jsdom = require('jsdom');
const { JSDOM } = jsdom;
import { useMediaQuery } from 'react-responsive';
import 'clipboard';
import prism from 'prismjs';
import reactStringReplace from 'react-string-replace';
import 'prism-themes/themes/prism-dracula.css';
import parse, { domToReact } from 'html-react-parser';
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

import { GetStaticPaths, GetStaticProps } from 'next';
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
import { allPosts } from '@/utils/notion';
import SearchButton from '@/components/SearchButtopn';
import Author from '@/components/post/Author';

export const getStaticProps: GetStaticProps = async (ctx) => {
  const { slug } = ctx.params as Params;
  const { results: slugContent } = await fetchPages({ slug: slug });
  const { results: contents } = await allPosts();
  if (!slugContent.length) {
    return {
      notFound: true,
    };
  }
  const pages = contents;
  const page = slugContent[0];
  const pageId = page.id;
  const { results: blocks } = await fetchBlocksByPageId(pageId);

  let json = JSON.stringify(blocks, null, 0);

  json = json.replace('//', '').replace('[', '').replace(']', '');

  const lines = json.split(',');

  const links: any[] = [];

  lines.map((line) => {
    if (line.includes('https://')) {
      let link: any = reactStringReplace(
        line,
        /(https?:\/\/\S+)/g,
        (match, i) => match
      );
      link = String(link[1]).slice(0, -2).replace('"', '');
      links.push(link);
    }
    if (line.includes('http://')) {
      let link: any = reactStringReplace(
        line,
        /(http?:\/\/\S+)/g,
        (match, i) => match
      );
      link = String(link[1]).slice(0, -2).replace('"', '');
      links.push(link);
    }
  });
  let cardDatas = [];
  const temps = await Promise.all(
    links.map(async (link) => {
      const metas = await fetch(link)
        .then((res) => res.text())
        .then((text) => {
          const metaData = {
            url: link,
            title: '',
            description: '',
            image: '',
            favicon: '',
          };
          const doms = new JSDOM(text);
          const metas = doms.window.document.getElementsByTagName('meta');
          for (let i = 0; i < metas.length; i++) {
            let pro = metas[i].getAttribute('property');
            if (typeof pro == 'string') {
              if (pro.match('og:title'))
                metaData.title = metas[i].getAttribute('content');
              if (pro.match('og:description'))
                metaData.description = metas[i].getAttribute('content');
              if (pro.match('og:image') && metaData.image === '')
                metaData.image = metas[i].getAttribute('content');
            }
          }
          return metaData;
        })
        .catch((e) => {
          console.log(e);
        });
      return metas;
    })
  );
  cardDatas = temps.filter((temp) => temp !== undefined);

  return {
    props: {
      page: page,
      blocks: blocks,
      pages: pages,
      cardDatas: cardDatas,
    },
    revalidate: 300,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking',
  };
};

const Article: FC<ArticleProps> = ({ page, blocks, pages, cardDatas }) => {
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

  const replace = (node: any) => {
    if (node.name === 'a') {
      if (node.parent.children.length === 1 && node.parent.name !== 'li') {
        const indexOfUrl = cardDatas.findIndex((card) => {
          return card.url.indexOf(node.attribs?.href) != -1;
        });
        const cardData = cardDatas[indexOfUrl];

        //内部リンクか外部リンク化判定
        const blank = cardData.url.indexOf(siteConfig.siteUrl) === -1;
        const blankProp = blank
          ? {
              target: '_blank',
              rel: 'noopener nofollow',
            }
          : {};
        if (cardData.title && cardData.image) {
          return (
            <a
              href={cardData.url}
              className="flex bg-white rounded-md card-link px-2 py-4 max-h-[170px]"
              {...blankProp}
            >
              <div className="flex mx-auto justify-between items-center overflow-hidden">
                <div className="flex flex-col justify-start w-full mr-4 max-w-md">
                  <p className="card-title">{cardData.title}</p>
                  <p className="card-description">{cardData.description}</p>
                  <span className="w-full text-ellipsis overflow-hidden text-xs">
                    {cardData.url}
                  </span>
                </div>
                <Image
                  src={cardData.image ? cardData.image : '/img/noimg.jpg'}
                  alt={cardData.title}
                  width="100"
                  height="100"
                  className="object-contain w-[200px] h-auto max-w-xs"
                />
              </div>
            </a>
          );
        }
        return (
          <a href={cardData.url} {...blankProp} data-nemui="nemui">
            {domToReact(node.children)}
          </a>
        );
      }
      return (
        <a {...node.attribs} target="_blank" data-nemukunai="nemukunaiyou">
          {domToReact(node.children)}
        </a>
      );
    }
  };

  const html = parse(notionToHtml, { replace });

  return (
    <Layout>
      <Seo
        pageTitle={getText(page.properties.name.title)}
        pageDescription={getText(page.properties.description.rich_text)}
        pageImg={getCover(page.cover)}
        pageImgWidth={1152}
        pageImgHeight={622}
        pagePath={`${siteConfig.siteUrl}study/${getSelect(
          page.properties.category.select
        )}/${getText(page.properties.slug.rich_text)}`}
      />
      <CategoryMenu pages={pages} />
      <div className="xl:pt-[98px] xl:px-5 w-full bg-gray-200">
        <div className="w-full max-w-6xl xl:max-w-4xl mx-auto md:py-5 md:pt-0 flex justify-between py-10">
          <div className=" bg-white xl:max-w-6xl xl:mx-auto w-full max-w-3xl shadow-md post rounded-md">
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
                        ' text-xs p-1 border-[1px] px-2 xl:text-[12px] text-white rounded-sm'
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
                          className="text-xs p-1 px-2 m-0 rounded-sm text-gray-400 font-medium mr-2 xl:text-[12px] hover:text-gray-600  border-[1px]
                          border-gray-400 align-middle"
                          href={`/tag/${tag}`}
                        >{`#${tag} `}</Link>
                      )
                    )}
                  </p>
                </div>
              </div>
              <h1 className="mt-3 mb-5 w-full text-3xl xl:mb-3 xl:text-xl md:text-[18px]">
                {getText(page.properties.name.title)}
              </h1>
            </div>
            <Image
              src={getCover(page.cover)}
              width="768"
              height="360"
              alt={getText(page.properties.name.title)}
              className="object-cover w-full mb-10 xl:mb-0"
            />
            <div className="p-10 xl:p-5 py-0 context">
              {isBreakPoint ? <MainToc /> : <></>}
              {html}
            </div>
            <div className="my-10 xl:px-5 px-10 xl:mb-0">
              <Sns page={page} />
              <Author />
            </div>
          </div>
          <div className="xl:hidden aside w-full max-w-xs">
            <SearchButton pages={pages} />
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
