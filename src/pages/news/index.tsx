import { GetServerSideProps, NextPage } from 'next';
import Layout from '@/components/Layout';
import Card from '@/components/Card';
import Breadcrumb from '@/components/Breadcrumb';
import { fetchNewsPages, fetchPages } from '@/utils/notion';
import { IndexProps } from '@/types/types';
import CategoryMenu from '@/components/CategoryMenu';
import Seo from '@/components/Seo';
import { siteConfig } from '@/site.config';
import List from '@/components/List';
import NewsList from '@/components/NewsList';

export const getServerSideProps: GetServerSideProps = async () => {
  const { results } = await fetchNewsPages({});
  return {
    props: {
      pages: results ? results : [],
    },
  };
};

const News: NextPage<IndexProps> = ({ pages }) => {
  return (
    <Layout>
      <Seo
        pageTitle={'お知らせ一覧'}
        pageImg={`${siteConfig.siteUrl}ogp.jpg`}
        pageImgWidth={1200}
        pageImgHeight={800}
        pagePath={`${siteConfig.siteUrl}news`}
      />
      <div>
        <div className="pt-[78px] relative w-full bg-gray-200">
          <div className="w-full max-w-6xl mx-auto">
            <h1 className="xl:px-5 text-gray-800 py-10">NEWS</h1>
            <div className="flex xl:px-5 flex-wrap justify-between xl:items-stretch">
              {pages.map((page, index) => (
                <NewsList key={index} index={index} page={page} />
              ))}
            </div>
          </div>
        </div>
        <Breadcrumb breadList={`news`} breadListJs={`お知らせ一覧`} />
      </div>
    </Layout>
  );
};

export default News;
