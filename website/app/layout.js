import { Inter } from 'next/font/google'
import './globals.css'

import Script from 'next/script';
const GTM_ID = 'GTM-WK43NHND';

import Header from '@/app/components/header';

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  metadataBase: new URL('https://gumly.co'),
  title: 'Gumly.co - Zappy link with superhero chews',
  description: 'Introducing a link-chew-nology management tool for a chewrific marketing team!',
  openGraph: {
    images: '/previewimage.png'
  }
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Script id="google-tag-manager" strategy='afterInteractive'>
        {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_ID}');`}
      </Script>
      <body className={`${inter.className} bg-[#0D0613] antialiased `}>

        <div className=''>
          <Header />
          {children}
          <footer className='py-20 container mx-auto'>
            <p className='text-center text-sm text-purple-300 opacity-40'>Gumly.co</p>
          </footer>
        </div>


        <noscript
        dangerouslySetInnerHTML={{
        __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=${GTM_ID}" height="0" width="0" style="display: none; visibility: hidden;"></iframe>`,
        }} 
        />
        </body>
    </html>
  )
}
