import Image from 'next/image'
import { Inter } from 'next/font/google'
import Head from 'next/head'
import Topbar from '@/components/Topbar/Topbar'
import ProblemsTable from '@/components/ProblemsTable/PorblemsTable'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  
  return (
   <>
   <Head>
      <title>Mamont Lab</title>
      <meta name='viewport' content='width=device-width, initial-scale=1'/>
      <link rel='icon' href='/mammoth1.jpg' />
      <meta name='decription' content='Web application that contains leetcode problems and video solutions'/>
    </Head>
    <main className='bg-dark-layer-2 min-h-screen'>
        <Topbar/>
        <h1 className='text-2xl text-center  text-gray-400 font-medium uppercase mt-10 mb-5'>
          &ldquo;QUALITY OVER QUANTITY&rdquo; 👇
        </h1>
        <ProblemsTable/>
    </main>
   </>
  )
}
