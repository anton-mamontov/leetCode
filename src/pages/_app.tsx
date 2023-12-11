import Topbar from '@/components/Topbar/Topbar';
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head';
import {RecoilRoot} from 'recoil';

export default function App({ Component, pageProps }: AppProps) {
  return (
  <RecoilRoot>
    <Head>
      <title>Mamont Lab</title>
      <meta name='viewport' content='width=device-width, initial-scale=1'/>
      <link rel='icon' href='/mammoth1.jpg' />
      <meta name='decription' content='Web application that contains leetcode problems and video solutions'/>
    </Head>
    <Component {...pageProps}/>
  </RecoilRoot>
  );
}
