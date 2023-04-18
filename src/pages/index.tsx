import { FC, useRef } from 'react';
import { useIntersectionObserver } from '@/hooks/use-intersection-observer';
import { options, showElements } from '@/hooks/top/top-scroll';
import Layout from '@/components/Layout';
import About from '@/components/top/About';
import Contact from '@/components/top/Contact';
import FirstView from '@/components/top/FirstView';
import Skils from '@/components/top/Skils';
import Seo from '@/components/Seo';
import { siteConfig } from '@/site.config';
import { GetStaticProps } from 'next';
import { fetchNewsPages } from '@/utils/notion';
import { FirstProps } from '@/types/types';

export const getStaticProps: GetStaticProps = async () => {
  const newsPages = 3;
  const { results } = await fetchNewsPages({ pageSize: newsPages });
  return {
    props: {
      pages: results ? results : [],
    },
    revalidate: 10,
  };
};

const Home: FC<FirstProps> = ({ pages }) => {
  const home = useRef<HTMLDivElement>(null);
  const about = useRef<HTMLDivElement>(null);
  const skils = useRef<HTMLDivElement>(null);
  const contact = useRef<HTMLDivElement>(null);

  useIntersectionObserver([home, about, skils, contact], showElements, options);

  return (
    <Layout>
      <Seo
        pageDescription={`${siteConfig.description}`}
        pageImg={`${siteConfig.siteUrl}ogp.jpg`}
        pageImgWidth={1200}
        pageImgHeight={800}
        pagePath={`${siteConfig.siteUrl}`}
      />
      <FirstView item={home} pages={pages} />
      <About item={about} />
      <Skils item={skils} />
      <Contact item={contact} />
    </Layout>
  );
};

export default Home;
