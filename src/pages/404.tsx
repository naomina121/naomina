import Breadcrumb from '@/components/Breadcrumb';
import CategoryMenu from '@/components/CategoryMenu';
import Layout from '@/components/Layout';
import Seo from '@/components/Seo';
import { siteConfig } from '@/site.config';

const CustomErrorPage = () => {
  return (
    <Layout>
      <Seo
        pageTitle={'404 Not Found'}
        pageImg={`${siteConfig.siteUrl}ogp.jpg`}
        pageImgWidth={1200}
        pageImgHeight={800}
        pagePath={`${siteConfig.siteUrl}404`}
      />
      <div>
        <div className="pt-[78px] relative w-full bg-gray-200">
          <div className="w-full max-w-6xl pb-10 mx-auto">
            <h1 className="xl:px-10 text-gray-800 py-10">404 Not Found</h1>
            <p className="p-0 m-0">お探しのページは見つかりませんでした。</p>
          </div>
        </div>
        <Breadcrumb breadList={`404`} breadListJs={`404 Not Found`} />
      </div>
    </Layout>
  );
};

export default CustomErrorPage;
