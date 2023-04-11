import Loader from '@/components/Loder';
import '@/src/styles/globals.css';
import type { AppProps } from 'next/app';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div>
      <Loader />
      <ToastContainer />
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
