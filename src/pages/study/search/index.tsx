import { GetServerSideProps, GetServerSidePropsContext, NextPage } from 'next';
import Layout from '@/components/Layout';
import Breadcrumb from '@/components/Breadcrumb';
import { fetchBlocksByPageId, fetchPages } from '@/utils/notion';
import {Params, SearchProps } from '@/types/types';
import CategoryMenu from '@/components/CategoryMenu';
import Seo from '@/components/Seo';
import { siteConfig } from '@/site.config';
import { getSearchBlocks } from '@/hooks/json';
import List from '@/components/List';
import SearchButton from '@/components/SearchButtopn';
import { useMediaQuery } from 'react-responsive';
import Card from '@/components/Card';

export const getServerSideProps:GetServerSideProps = async (
  ctx,
 ) => {
  const { keyword,category } = ctx.query as Params;

  const { results: allPages } = await fetchPages({ category: category });

  let searchPages = [];

  for (const page of allPages) {
    let b = await fetchBlocksByPageId(page.id);
    let {results : searchBlock} = b;
    if (getSearchBlocks(searchBlock, keyword)) {
      searchPages.push(page);
    }
  }

  return {
    props: {
      pages: searchPages ? searchPages : [],
      keyword: keyword ? keyword : '',
    },
  };
};

const Search: NextPage<SearchProps> = ({ pages,keyword}) => {
  const isBreakPoint = useMediaQuery({ query: `(max-width:768px)` });
  return (
    <Layout>
      <Seo
        pageTitle={`「${keyword}」の検索結果`}
        pageImg={`${siteConfig.siteUrl}ogp.jpg`}
        pageImgWidth={1200}
        pageImgHeight={800}
        pagePath={`${siteConfig.siteUrl}study`}
      />
      <div>
        <CategoryMenu pages={pages} />
        <div className="xl:pt-[78px] relative w-full bg-gray-200">
          <div className="flex justify-between flex-col mx-auto max-w-6xl">
            <div className="w-full max-w-6xl mx-0">
              <h1 className="xl:px-5 text-gray-800 py-10">
                「{keyword}」の検索結果
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
        </div>
        <div className="bg-gray-300">
          <div className="xl:hidden w-full max-w-lg mx-auto  py-14 mb-[-40px] xl:px-10">
            <SearchButton pages={pages} />
          </div>
        </div>
        <Breadcrumb breadList={`study`} breadListJs={`学習記録`} />
      </div>
    </Layout>
  );
};

export default Search;
