import Topbar from '@/components/Topbar/Topbar';
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import {RecoilRoot} from 'recoil';

export default function App({ Component, pageProps }: AppProps) {
  return (
  <RecoilRoot>
    <Head>
      <title>Mamont Lab</title>
      <meta name='viewport' content='width=device-width, initial-scale=1'/>
      <link rel='icon' href='/code/mammoth1.jpg' />
      <meta name='decription' content='Web application that contains leetcode problems and video solutions'/>
    </Head>
    <ToastContainer/>
    <Component {...pageProps}/>
  </RecoilRoot>
  );
}
