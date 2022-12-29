import { useEffect } from 'react';
import Head from 'next/head';
import { AppProps } from 'next/app';
import '@fortawesome/fontawesome-svg-core/styles.css'; // import Font Awesome CSS
import Layout from '../components/layouts/Layout';
import { WeatherProvider } from '../contexts/globalState';

import 'react-toastify/dist/ReactToastify.min.css';
import 'bootstrap/dist/css/bootstrap.css';
import '../styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    require('bootstrap/dist/js/bootstrap.bundle.min.js');
  }, []);

  return (
    <>
      <Head>
        <meta name='viewport' content='width=device-width, initial-scale=1' />
      </Head>
      <WeatherProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </WeatherProvider>
    </>
  );
}

export default MyApp;
