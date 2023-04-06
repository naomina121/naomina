import Breadcrumb from '@/components/Breadcrumb';
import CategoryMenu from '@/components/CategoryMenu';
import Layout from '@/components/Layout';
import { IndexProps } from '@/types/types';
import { fetchPages } from '@/utils/notion';
import { getMultiSelect } from '@/utils/property';
import { GetStaticProps, NextPage } from 'next';
import Link from 'next/link';

export const getStaticProps: GetStaticProps = async () => {
  const { results } = await fetchPages({});
  return {
    props: {
      pages: results ? results : [],
    },
    revalidate: 10,
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
      <CategoryMenu />
      <div>
        <div className="w-full bg-gray-200 min-h-[500px]">
          <div className="w-full max-w-6xl mx-auto">
            <h1 className="xl:px-10 text-gray-800 py-10">タグ一覧</h1>
            <div className="flex flex-wrap pb-10">
              {unique_tags_array.map((tag, index) => (
                <Link className="tag" href={'/tag/' + tag} key={index}>
                  {tag}
                </Link>
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
