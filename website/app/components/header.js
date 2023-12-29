"use client"
import React, {useState} from 'react'

import Image from 'next/image'
import Link from 'next/link'


export default function Header(){
    const [isMobile, setIsMobile] = useState(false);

    const handleMobileMenu = () => {
        setIsMobile(!isMobile);
        console.log("clicked")
    }

    return(<>

    <div className="container mx-auto py-5 mt-5">
        <div className='flex justify-between text-white items-center mx-5 md:mx-0'>
            <Link href="/">
                <Image alt="Logo" src="/logo-light.png" width={100} height={20} />
            </Link>
            
            <nav className="hidden md:block">
                <ul className="flex items-center gap-6 text-md">
                <li>
                    <Link className="text-gray-400 transition hover:text-gray-300" href="/"> Pricing </Link>
                </li>

                {/* <li>
                    <a className="text-gray-400 transition hover:text-gray-300" href="/"> Features </a>
                </li> */}

                <li>
                    <a className="text-gray-400 transition hover:text-gray-300" href="/"> Campagin URL Buidler </a>
                </li>

                <li>
                    <a className="text-gray-400 transition hover:text-gray-300" href="/"> Feedback </a>
                </li>
                </ul>
            </nav>
            
            <a href="https://app.gumly.co/login"><button className='hidden md:block rounded-full px-5 py-1.5 bg-purple-700 text-xs'>Login</button></a>

            <div className='md:hidden'>
            <button type="button" class="flex items-center justify-center p-2 text-purple-400 md:hidden" onClick={handleMobileMenu}>
                <svg xmlns="http://www.w3.org/2000/svg" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" width="1em" height="1em" class="inline-flex shrink-0 text-3xl">
                    <line x1="4" y1="8" x2="20" y2="8"></line>
                    <line x1="4" y1="16" x2="20" y2="16"></line>
                </svg>
            </button>

            {isMobile && 
                <div className='w-full absolute top-30 shadow-lg left-0 z-20'>
                    <div className='w-full px-10 py-10 bg-[#0D0613]'>
                        <ul className='block'>
                            <li className='py-4'>Pricing</li>
                            <li className='py-4'>Campaign URL Builder</li>
                            <li className='py-4'>Feedback</li>
                        </ul>

                        <a href="https://app.gumly.co/login"><button className='mt-5 rounded-full w-full px-5 py-2 bg-purple-700 text-sm'>Login</button></a>
                        <a href="https://app.gumly.co/register"><button className='mt-5 rounded-full w-full px-5 py-2 outline outline-purple-700 text-sm'>Create Account</button></a>
                    </div>
                </div>
            }
            
            </div>

        </div>
    </div>
    
    </>)
}