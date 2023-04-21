import React, { FC } from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';
import { Params } from '@/types/types';
import Breadcrumb from '@/components/Breadcrumb';
import Layout from '@/components/Layout';
import { fetchPages } from '@/utils/notion';
import CategoryMenu from '@/components/CategoryMenu';
import List from '@/components/List';
import { TagProps } from '@/types/types';
import Seo from '@/components/Seo';
import { siteConfig } from '@/site.config';
import SearchButton from '@/components/SearchButtopn';
import { useMediaQuery } from 'react-responsive';
import Card from '@/components/Card';

export const getStaticProps: GetStaticProps = async (ctx) => {
  const { tag } = ctx.params as Params;
  const { results } = await fetchPages({ tag: tag });
  const { results: contents } = await fetchPages({});
  if (!results.length) {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      pages: results ? results : [],
      tag: tag,
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

const Tag: FC<TagProps> = ({ pages, tag, contents }) => {
  const isBreakPoint = useMediaQuery({ query: `(max-width:768px)` });
  return (
    <Layout>
      <Seo
        pageTitle={tag}
        pageImg={`${siteConfig.siteUrl}ogp.jpg`}
        pageImgWidth={1200}
        pageImgHeight={800}
        pagePath={`${siteConfig.siteUrl}tag/${tag}`}
      />
      <CategoryMenu pages={contents} />
      <div>
        <div className="xl:pt-[78px] w-full bg-gray-200">
          <div className="w-full max-w-6xl mx-auto">
            <h1 className="xl:px-5 text-gray-800 py-10">
              TAG:{tag.toUpperCase()}
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
            <SearchButton pages={pages} />
          </div>
        </div>
        <Breadcrumb breadList={`tag/${tag}`} breadListJs={`タグ/${tag}`} />
      </div>
    </Layout>
  );
};

export default Tag;
