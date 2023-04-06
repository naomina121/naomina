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

const Home: FC = () => {
  const home = useRef<HTMLDivElement>(null);
  const about = useRef<HTMLDivElement>(null);
  const skils = useRef<HTMLDivElement>(null);
  const contact = useRef<HTMLDivElement>(null);

  useIntersectionObserver([home, about, skils, contact], showElements, options);

  return (
    <Layout>
      <Seo
        pageDescription={
          '未経験からエンジニアを目指すための個人の学習記録サイトです'
        }
        pageImg={`${siteConfig.siteUrl}ogp.jpg`}
        pageImgWidth={1200}
        pageImgHeight={800}
        pagePath={`${siteConfig.siteUrl}`}
      />
      <FirstView item={home} />
      <About item={about} />
      <Skils item={skils} />
      <Contact item={contact} />
    </Layout>
  );
};

export default Home;
