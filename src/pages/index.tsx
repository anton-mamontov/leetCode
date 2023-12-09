import Image from 'next/image'
import { Inter } from 'next/font/google'
import Head from 'next/head'
import Topbar from '@/components/Topbar/Topbar'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
   <>
   <Head>
      <title>Leet Code</title>
      <meta name='viewport' content='width=device-width, initial-scale=1'/>
      <link rel='icon' href='/favicon.png'/>
      <meta name='decription' content='Web application that contains leetcode problems and video solutions'/>
    </Head>
    <Topbar/>
    <main>
      <h1>Hello world</h1>
    </main>
   </>
  )
}
