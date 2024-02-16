import 'bootstrap/dist/css/bootstrap.min.css';
import "@/styles/globals.css";
import "@/styles/class.css";
import "@/styles/Home.css";
import "@/styles/BookPage.css";
import "@/styles/ManageBook.css";
import "@/styles/ArticleListing.css";
import "@/styles/Article.css";
import "@/styles/footer.css";
import type { AppProps } from "next/app";
import Script from "next/script";
import AuthProvider from '@/lib/AuthProvider';
import Layout from '@/Layout/Layout';
import { useEffect } from 'react';
import Router from 'next/router';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

export default function App({ Component, pageProps }: AppProps) {

  useEffect(() => {
    const handleRouteChangeStart = () => NProgress.start();
    Router.events.on('routeChangeStart', handleRouteChangeStart);

    // Stop NProgress on route change complete/error
    const handleRouteChangeComplete = () => NProgress.done();
    const handleRouteChangeError = () => NProgress.done();
    Router.events.on('routeChangeComplete', handleRouteChangeComplete);
    Router.events.on('routeChangeError', handleRouteChangeError);

    // Clean up event listeners when the component is unmounted
    return () => {
      Router.events.off('routeChangeStart', handleRouteChangeStart);
      Router.events.off('routeChangeComplete', handleRouteChangeComplete);
      Router.events.off('routeChangeError', handleRouteChangeError);
    };
  }, [])

  return <>
    <AuthProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AuthProvider>

    <Script
      src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"
      integrity="sha384-C6RzsynM9kWDrMNeT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL"
      crossOrigin="anonymous"></Script>
  </>
}
