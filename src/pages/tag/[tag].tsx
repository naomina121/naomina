import React, { FC } from 'react';
import { GetServerSideProps } from 'next';
import { Params } from '@/types/types';
import Breadcrumb from '@/components/Breadcrumb';
import Layout from '@/components/Layout';
import { allPosts, fetchPages } from '@/utils/notion';
import CategoryMenu from '@/components/CategoryMenu';
import List from '@/components/List';
import { TagProps } from '@/types/types';
import Seo from '@/components/Seo';
import { siteConfig } from '@/site.config';
import SearchButton from '@/components/SearchButtopn';

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { tag } = ctx.params as Params;
  const { results } = await fetchPages({ tag: tag });
  const { results: contents } = await allPosts();
  if (!results.length) {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      pages: results ? results : [],
      tag: tag,
      contents:contents,
    },
  };
};

const Tag: FC<TagProps> = ({ pages, tag, contents }) => {
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
        <div className="w-full bg-gray-200">
          <div className="w-full max-w-6xl mx-auto">
            <h1 className="xl:px-10 text-gray-800 py-10">
              TAG:{tag.toUpperCase()}
            </h1>
            <div className="flex flex-wrap justify-between">
              {pages.map((page, index) => (
                <List key={index} index={index} page={page} />
              ))}
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
