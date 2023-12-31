
import Image from 'next/image'
import Head from "next/head";


import HomeLinkShortener from './components/HomeLinkShortener'

export default function Home() {

  return (
    <>

    <main className="overflow-x-hidden ">
      <section className='relative z-10 py-20 text-center'>
        <div className="absolute left-1/2 top-1/2 -z-10 h-[60px] w-[800px] -translate-x-1/2 -translate-y-1/2 opacity-40 blur-[70px] bg-purple-600"></div>
        <div className='container mx-auto flex justify-center items-center h-[200px]'>
          <h1 className='inline-flex flex-col gap-1 transition font-display text-5xl font-bold leading-none md:text-[4rem] lg:text-[5rem] 
          bg-gradient-to-r from-20% bg-clip-text text-transparent from-purple-500 to-purple-200 mx-5 md:mx-0'>
            <span>Zappy link</span>
            <span>with superhero chews</span>
            </h1>
            
        </div>
        <p className='text-purple-200 text-md mb-10 mx-5 md:mx-0'>Introducing a link-chew-nology management tool for a chewrific marketing team!</p>

        <a href="https://app.gumly.co/register">
          <button className="text-sm px-5 py-2 md:px-6 md:py-2 bg-purple-700 text-purple-200 rounded-lg">
            Let's get started
          </button>
        </a>

      </section>

      <section>
        <div className='text-white container mx-auto'>
          <div className='w-full'>
            <HomeLinkShortener />
          </div>
        </div>
      
      </section>
    </main>
    </>
    
  )
}
