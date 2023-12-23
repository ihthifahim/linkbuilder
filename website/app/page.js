
import Image from 'next/image'


import HomeLinkShortener from './components/HomeLinkShortener'

export default function Home() {

  return (
    <main className="overflow-x-hidden">
      
      <section className='relative z-10 py-20 text-center'>
        <div class="absolute left-1/2 top-1/2 -z-10 h-[60px] w-[800px] -translate-x-1/2 -translate-y-1/2 opacity-40 blur-[70px] bg-purple-600"></div>
        <div className='container mx-auto flex justify-center items-center h-[200px]'>
          <h1 className='inline-flex flex-col gap-1 transition font-display text-4xl font-bold leading-none md:text-[5rem] 
          bg-gradient-to-r from-20% bg-clip-text text-transparent from-purple-500 to-purple-200'>
            <span>Zappy link</span>
            <span>with superhero chews</span>
            </h1>
            
        </div>
        <p className='text-purple-200 text-md mb-10'>Introducing a link-chew-nology management tool for a chewrific marketing team!</p>
        <button className='px-6 py-2 bg-purple-700 text-purple-200 rounded-lg'>Create account</button>
      </section>

      <section>
        <div className='text-white container mx-auto'>

          <HomeLinkShortener />
          
        </div>
      
      </section>
    </main>
  )
}
