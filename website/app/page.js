"use client";
import React, {useState, useRef} from 'react'
import Image from 'next/image'
import Link from 'next/link'

import LinkCopied from './components/Alerts/LinkCopied';

export default function Home() {
  const linkRef = useRef();
  const [isCopied, setIsCopied] = useState(false);

  const handleCopyToClipboard = () => {
    const linkText = linkRef.current.textContent;
    console.log(linkText)

    const tempInput = document.createElement('input');
    tempInput.value = linkText;
    document.body.appendChild(tempInput);

    tempInput.select();
    tempInput.setSelectionRange(0, 99999); // For mobile devices

    document.execCommand('copy');

    document.body.removeChild(tempInput);

    setIsCopied(true);

    setTimeout(() => {
        setIsCopied(false);
    }, 1500);
};


  return (
    <main className="overflow-x-hidden">
      {isCopied && <LinkCopied />}
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
          
          <div className='flex justify-center items-center'>
            <div className='w-2/6'>
              <p className='text-center mb-6 text-purple-200 opacity-40'>Copy and paste your link and see it start to chew</p>
                <div className="flex">
                  <input
                    type="url"
                    className='w-full text-black px-4 py-3 rounded-l-lg border border-gray-200 bg-white shadow-lg focus:border-black focus:outline-none focus:ring-0 sm:text-sm'
                    placeholder='http://www.gumly.co/your-longest/l***-you/can-ever/find/oh-maaan/okay-lets/stop-here'
                  />
                  <button
                    type="submit"
                    className="px-4 py-3 bg-purple-700 text-white rounded-r-lg hover:bg-purple-900  focus:outline-none whitespace-nowrap"
                  >
                    Chew
                  </button>
                </div>
              </div>
          </div>

          <div className='w-2/6 mx-auto mt-5 text-black'>
          <div className='bg-purple-600 rounded-lg py-5 px-5 flex items-center hover:shadow-lg mb-5'>
            <div className="">
                {/* <img alt="profile" src={link.page_favicon} className="w-16 rounded-full" /> */}
            </div>
            <div className="w-full ml-5">
              <h2 className="font-bold text-lg text-purple-200" ref={linkRef}>gum.lk/alskjd
              <button onClick={handleCopyToClipboard} className=" ml-3 group rounded-full bg-purple-500 p-1.5 transition-all duration-75 hover:scale-105 hover:bg-blue-100 active:scale-95"><span className="sr-only"></span><svg fill="none" shapeRendering="geometricPrecision"
                  stroke="currentColor"
                  strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="14" height="14" className="text-gray-700 transition-all group-hover:text-blue-800"><path d="M8 17.929H6c-1.105 0-2-.912-2-2.036V5.036C4 3.91 4.895 3 6 3h8c1.105 0 2 .911 2 2.036v1.866m-6 .17h8c1.105 0 2 .91 2 2.035v10.857C20 21.09 19.105 22 18 22h-8c-1.105 0-2-.911-2-2.036V9.107c0-1.124.895-2.036 2-2.036z"></path></svg>
              </button>
              </h2>
            </div>
          </div>
          <p className='text-purple-200 text-sm'>Your link will only be valid for 30 days. Want own your links and view their analytics? <Link href="https://app.gumly.co" className="underline">Create a free acount.</Link></p>
          </div>
          
        </div>
      
      </section>
    </main>
  )
}
