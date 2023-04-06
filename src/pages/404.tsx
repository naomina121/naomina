import CategoryMenu from '@/components/CategoryMenu';
import Layout from '@/components/Layout';
import Link from 'next/link';
import { useRouter } from 'next/router';

const CustomErrorPage = () => {
  const router = useRouter();

  return (
    <Layout>
      <CategoryMenu />
      <div>{router.asPath} ページは存在しません</div>
      <Link href="/">ホームに戻る</Link>
    </Layout>
  );
};

export default CustomErrorPage;
