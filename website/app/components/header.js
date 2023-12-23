import Image from 'next/image'
import Link from 'next/link'


export default function Header(){
    return(<>

    <div className="container mx-auto py-5 mt-5">
        <div className='flex justify-between text-white items-center'>
            <Link href="/">
                <Image src="/logo-light.png" width={100} height={20} />
            </Link>
            
            
            <nav class="hidden md:block">
                <ul class="flex items-center gap-6 text-md">
                <li>
                    <Link class="text-gray-400 transition hover:text-gray-300" href="/"> Pricing </Link>
                </li>

                {/* <li>
                    <a class="text-gray-400 transition hover:text-gray-300" href="/"> Features </a>
                </li> */}

                <li>
                    <a class="text-gray-400 transition hover:text-gray-300" href="/"> Campagin URL Buidler </a>
                </li>

                <li>
                    <a class="text-gray-400 transition hover:text-gray-300" href="/"> Feedback </a>
                </li>
                </ul>
            </nav>
            
            <button className='rounded-full px-6 py-2 bg-purple-700 '>Login</button>
        </div>
    </div>
    
    </>)
}