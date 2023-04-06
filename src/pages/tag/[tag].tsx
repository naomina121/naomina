import React, { FC } from 'react';
import { GetServerSideProps, GetStaticPaths, GetStaticProps } from 'next';
import { Params } from '@/types/types';
import Breadcrumb from '@/components/Breadcrumb';
import Layout from '@/components/Layout';
import { fetchPages } from '@/utils/notion';
import CategoryMenu from '@/components/CategoryMenu';
import { samplePages } from '@/utils/example';
import List from '@/components/List';
import { TagProps } from '@/types/types';
import { getMultiSelect } from '@/utils/property';

// SSR
// export const getServerSideProps: GetServerSideProps = async (ctx) => {
//   const { tag } = ctx.params as Params;
//   const { results } = await fetchPages({ tag: tag });

//   return {
//     props: {
//       //pages: samplePages,
//       pages: results ? results : [],
//       tag: tag,
//     },
//   };
// };

export const getStaticPaths: GetStaticPaths = async () => {
  const { results }: { results: Record<string, any>[] } = await fetchPages({});

  const pathSet: Set<string> = new Set();
  for (const page of results) {
    for (const tag of getMultiSelect(page.properties.tags.multi_select)) {
      pathSet.add(tag);
    }
  }

  const paths = Array.from(pathSet).map((tag) => {
    return {
      params: {
        tag: tag,
      },
    };
  });

  return {
    paths: paths,
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps = async (ctx) => {
  const { tag } = ctx.params as Params;
  const { results } = await fetchPages({ tag: tag });
  if (!results) {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      pages: results ? results : [],
      tag: tag,
    },
    revalidate: 10,
  };
};

const Tag: FC<TagProps> = ({ pages, tag }) => {
  return (
    <Layout>
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
        <Breadcrumb />
      </div>
    </Layout>
  );
};

export default Tag;
