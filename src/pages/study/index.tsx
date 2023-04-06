import { GetStaticProps, NextPage } from 'next';
import Layout from '@/components/Layout';
import Card from '@/components/Card';
import Breadcrumb from '@/components/Breadcrumb';
import { fetchPages } from '@/utils/notion';
import { IndexProps } from '@/types/types';
import CategoryMenu from '@/components/CategoryMenu';
import { samplePages } from '@/utils/example';
import Seo from '@/components/Seo';
import { siteConfig } from '@/site.config';

export const getStaticProps: GetStaticProps = async () => {
  const { results } = await fetchPages({});
  return {
    props: {
      pages: results ? results : [],
      // pages: samplePages,
    },
    revalidate: 10,
  };
};

const Study: NextPage<IndexProps> = ({ pages }) => {
  return (
    <Layout>
      <Seo
        pageTitle={'学習記録'}
        pageImg={`${siteConfig.siteUrl}ogp.jpg`}
        pageImgWidth={1200}
        pageImgHeight={800}
      />
      <main>
        <CategoryMenu />
        <div className="xl:pt-[px] relative w-full bg-gray-200">
          <div className="w-full max-w-6xl mx-auto">
            <h1 className="xl:px-10 text-gray-800 py-10">STUDY</h1>
            <div className="flex xl:px-10 flex-wrap justify-between xl:items-stretch">
              {pages.map((page, index) => (
                <Card key={index} index={index} page={page} />
              ))}
            </div>
          </div>
        </div>
        <Breadcrumb />
      </main>
    </Layout>
  );
};

export default Study;
