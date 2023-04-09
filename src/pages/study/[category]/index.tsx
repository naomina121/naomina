import React, { FC } from 'react';
import { GetServerSideProps } from 'next';
import { CategoryProps, Params } from '@/types/types';
import Breadcrumb from '@/components/Breadcrumb';
import Layout from '@/components/Layout';
import { fetchPages } from '@/utils/notion';
import CategoryMenu from '@/components/CategoryMenu';
import List from '@/components/List';
import Seo from '@/components/Seo';
import { siteConfig } from '@/site.config';
import { getForumla } from '@/utils/property';

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { category } = ctx.params as Params;
  const { results } = await fetchPages({ category: category });
  return {
    props: {
      pages: results ? results : [],
      category: category,
    },
  };
};

const Category: FC<CategoryProps> = ({ pages, category }) => {
  let is_pages = false;
  if(pages.length){
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
      <CategoryMenu />
      {is_pages ? (
        <div>
          <div className="w-full xl:pt-[78px] bg-gray-200">
            <div className="w-full max-w-6xl mx-auto">
              <h1 className="rerative xl:px-10 text-gray-800 py-10">
                {category.toUpperCase()}
              </h1>
              <div className="flex flex-wrap w-full justify-between">
                {pages.map((page, index) => (
                  <List key={index} index={index} page={page} />
                ))}
              </div>
            </div>
          </div>
          <Breadcrumb
            breadList={`study/${category}`}
            breadListJs={`学習記録/${getForumla(
              pages[0].properties.isJaCategory.formula
            )}`}
          />
        </div>
      ) : (
        <div>
          <div className="w-full xl:pt-[78px] bg-gray-200">
            <div className="w-full max-w-6xl mx-auto">
              <h1 className="rerative xl:px-10 text-gray-800 py-10">
                {category.toUpperCase()}
              </h1>
              <div className="min-h-[300px]">
                <p>残念ながら、まだ、このカテゴリーの記事はありません。</p>
              </div>
            </div>
          </div>
          <Breadcrumb
            breadList={`study/${category}`}
            breadListJs={`学習記録/${category}`}
          />
        </div>
      )}
    </Layout>
  );
};

export default Category;
