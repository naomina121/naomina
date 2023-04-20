import Breadcrumb from '@/components/Breadcrumb';
import CategoryMenu from '@/components/CategoryMenu';
import Layout from '@/components/Layout';
import SearchButton from '@/components/SearchButtopn';
import Seo from '@/components/Seo';
import { siteConfig } from '@/site.config';
import { IndexProps, PageType } from '@/types/types';
import { fetchPages } from '@/utils/notion';
import { getMultiSelect } from '@/utils/property';
import { GetServerSideProps, NextPage } from 'next';
import Link from 'next/link';

export const getServerSideProps: GetServerSideProps = async () => {
  const { results } = await fetchPages({});
  return {
    props: {
      pages: results ? results : [],
    },
  };
};

const Tag: NextPage<IndexProps> = ({ pages }) => {
  const tag = pages.map((item) =>
    getMultiSelect(item.properties.tags.multi_select)
  );

  // setオブジェクトを介して重複分を削除
  let tag_array = new Set(tag);

  // 再度配列化
  let unique_pref_array = Array.from(tag_array);
  let string_array = unique_pref_array.join();
  let tags_array = string_array.split(',');
  let unique_tags = new Set(tags_array);
  let unique_tags_array = Array.from(unique_tags);

  return (
    <Layout>
      <Seo
        pageTitle={'tag'}
        pageImg={`${siteConfig.siteUrl}ogp.jpg`}
        pageImgWidth={1200}
        pageImgHeight={800}
        pagePath={`${siteConfig.siteUrl}tag`}
      />
      <CategoryMenu pages={pages} />
      <div>
        <div className="w-full bg-gray-200 min-h-[500px]">
          <div className="w-full max-w-6xl mx-auto">
            <h1 className="xl:px-10 text-gray-800 py-10">タグ一覧</h1>
            <div className="flex flex-wrap pb-10">
              {unique_tags_array.map((tag, index) => {
                if (unique_tags_array.length - 1 !== index) {
                  return (
                    <Link className="tag" href={'/tag/' + tag} key={index}>
                      {tag}
                    </Link>
                  );
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
        <Breadcrumb breadList={`tag`} breadListJs={`タグ`} />
      </div>
    </Layout>
  );
};

export default Tag;
