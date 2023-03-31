import { NextPage } from 'next';
import { useRef } from 'react';
import { useIntersectionObserver } from '@/hooks/use-intersection-observer';
import { options, showElements } from '@/hooks/top/Sclool';
import Layout from '@/components/Layout';
import About from '@/components/top/About';
import Contact from '@/components/top/Contact';
import FirstView from '@/components/top/FirstView';
import Skils from '@/components/top/Skils';

const Home: NextPage = () => {
  const home = useRef<HTMLDivElement>(null);
  const about = useRef<HTMLDivElement>(null);
  const skils = useRef<HTMLDivElement>(null);
  const contact = useRef<HTMLDivElement>(null);

  useIntersectionObserver([home, about, skils, contact], showElements, options);

  return (
    <Layout>
      <FirstView item={home} />
      <About item={about} />
      <Skils item={skils} />
      <Contact item={contact} />
    </Layout>
  );
};

export default Home;
