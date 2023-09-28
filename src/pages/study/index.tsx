import { GetStaticProps, NextPage } from 'next';
import Layout from '@/components/Layout';
import Card from '@/components/Card';
import Breadcrumb from '@/components/Breadcrumb';
import { fetchPages } from '@/utils/notion';
import { IndexProps } from '@/types/types';
import CategoryMenu from '@/components/CategoryMenu';
import Seo from '@/components/Seo';
import { siteConfig } from '@/site.config';

export const getStaticProps: GetStaticProps = async () => {
  const { results: pages } = await fetchPages({});

  return {
    props: {
      pages: pages ? pages : [],
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
        pagePath={`${siteConfig.siteUrl}study`}
      />
      <div>
        <CategoryMenu pages={pages} />
        <div className="xl:pt-[78px] relative w-full bg-gray-200">
          <div className="w-full max-w-6xl mx-auto">
            <h1 className="xl:px-5 text-gray-800 py-10">STUDY</h1>
            <div className="flex xl:px-5 flex-wrap justify-between ">
              {pages.map((page, index) => (
                <Card key={index} index={index} page={page} />
              ))}
            </div>
          </div>
        </div>
        <Breadcrumb breadList={`study`} breadListJs={`学習記録`} />
      </div>
    </Layout>
  );
};

export default Study;
