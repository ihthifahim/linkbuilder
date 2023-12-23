import Image from 'next/image'
import Link from 'next/link'


export default function Header(){
    return(<>

    <div className="container mx-auto py-5 mt-5">
        <div className='flex justify-between text-white items-center mx-5 md:mx-0'>
            <Link href="/">
                <Image src="/logo-light.png" width={100} height={20} />
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
            
            <a href="https://app.gumly.co/login"><button className='rounded-full px-6 py-2 bg-purple-700 '>Login</button></a>
        </div>
    </div>
    
    </>)
}