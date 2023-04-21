import React, { FC } from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';
import { CategoryProps, Params } from '@/types/types';
import Breadcrumb from '@/components/Breadcrumb';
import Layout from '@/components/Layout';
import { fetchPages } from '@/utils/notion';
import CategoryMenu from '@/components/CategoryMenu';
import List from '@/components/List';
import Seo from '@/components/Seo';
import { siteConfig } from '@/site.config';
import { getForumla } from '@/utils/property';
import SearchButton from '@/components/SearchButtopn';
import { useMediaQuery } from 'react-responsive';
import Card from '@/components/Card';

export const getStaticProps: GetStaticProps = async (ctx) => {
  const { category } = ctx.params as Params;
  const { results } = await fetchPages({ category: category });
  const { results: contents } = await fetchPages({});

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
    revalidate: 10,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking',
  };
};

const Category: FC<CategoryProps> = ({ pages, category, contents }) => {
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
        pagePath={`${siteConfig.siteUrl}study/${category}`}
      />
      <CategoryMenu pages={contents} />
      <div>
        <div className="w-full xl:pt-[78px] bg-gray-200">
          <div className="w-full max-w-6xl mx-auto">
            <h1 className="rerative xl:px-5 text-gray-800 py-10">
              {category.toUpperCase()}
            </h1>
            <div className="flex flex-wrap w-full justify-between xl:items-stretch xl:px-5">
              {pages.map((page, index) => {
                if (isBreakPoint) {
                  return <Card key={index} index={index} page={page} />;
                } else {
                  return <List key={index} index={index} page={page} />;
                }
              })}
            </div>
          </div>
        </div>
        <div className="bg-gray-300">
          <div className="xl:hidden w-full max-w-lg mx-auto  py-14 mb-[-40px] xl:px-10">
            <SearchButton pages={contents} />
          </div>
        </div>
        <Breadcrumb
          breadList={`study/${category}`}
          breadListJs={`学習記録/${getForumla(
            pages[0].properties.isJaCategory.formula
          )}`}
        />
      </div>
    </Layout>
  );
};

export default Category;
