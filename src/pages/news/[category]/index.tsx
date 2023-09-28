import React, { FC } from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';
import { CategoryProps, Params } from '@/types/types';
import Breadcrumb from '@/components/Breadcrumb';
import Layout from '@/components/Layout';
import { fetchNewsPages, fetchPages } from '@/utils/notion';
import Seo from '@/components/Seo';
import { siteConfig } from '@/site.config';
import { getForumla } from '@/utils/property';
import { useMediaQuery } from 'react-responsive';
import NewsList from '@/components/NewsList';

export const getStaticProps: GetStaticProps = async (ctx) => {
  const { category } = ctx.params as Params;
  const { results } = await fetchNewsPages({ category: category });
  const { results: contents } = await fetchNewsPages({});

  if (!results.length) {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      pages: results ? results : [],
      category: category,
      contents: contents,
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

const NewsCategory: FC<CategoryProps> = ({ pages, category, contents }) => {
  const isBreakPoint = useMediaQuery({ query: `(max-width:768px)` });
  let is_pages = false;
  if (pages.length) {
    is_pages = true;
  }
  return (
    <Layout>
      <Seo
        pageTitle={`${category}の一覧`}
        pageImg={`${siteConfig.siteUrl}ogp.jpg`}
        pageImgWidth={1200}
        pageImgHeight={800}
        pagePath={`${siteConfig.siteUrl}news/${category}`}
      />
      <div>
        <div className="w-full pt-[78px] bg-gray-200">
          <div className="w-full max-w-6xl mx-auto">
            <h1 className="rerative xl:px-5 text-gray-800 py-10">
              {category.toUpperCase()}
            </h1>
            <div className="flex flex-wrap w-full justify-between xl:items-stretch xl:px-5">
              {pages.map((page, index) => {
                return <NewsList key={index} index={index} page={page} />;
              })}
            </div>
          </div>
        </div>
        <Breadcrumb
          breadList={`news/${category}`}
          breadListJs={`お知らせ一覧/${getForumla(
            pages[0].properties.isJaCategory.formula
          )}`}
        />
      </div>
    </Layout>
  );
};

export default NewsCategory;
