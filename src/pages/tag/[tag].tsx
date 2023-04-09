import React, { FC } from 'react';
import { GetServerSideProps, GetStaticPaths, GetStaticProps } from 'next';
import { Params } from '@/types/types';
import Breadcrumb from '@/components/Breadcrumb';
import Layout from '@/components/Layout';
import { fetchPages } from '@/utils/notion';
import CategoryMenu from '@/components/CategoryMenu';
import List from '@/components/List';
import { TagProps } from '@/types/types';
import Seo from '@/components/Seo';
import { siteConfig } from '@/site.config';
import { getMultiSelect } from '@/utils/property';

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { tag } = ctx.params as Params;
  const { results } = await fetchPages({ tag: tag });

  return {
    props: {
      pages: results ? results : [],
      tag: tag,
    },
  };
};

const Tag: FC<TagProps> = ({ pages, tag }) => {
  return (
    <Layout>
      <Seo
        pageTitle={tag}
        pageImg={`${siteConfig.siteUrl}ogp.jpg`}
        pageImgWidth={1200}
        pageImgHeight={800}
        pagePath={`${siteConfig.siteUrl}tag/${tag}`}
      />
      <CategoryMenu />
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
        <Breadcrumb breadList={`tag/${tag}`} breadListJs={`タグ/${tag}`} />
      </div>
    </Layout>
  );
};

export default Tag;
