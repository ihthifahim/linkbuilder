import Image from 'next/image'

export default function Home() {
  return (
      <main className="flex justify-center items-center min-h-screen bg-black">
        <div className="relative">
            <div className="absolute blur-[40px] opacity-30 bg-purple-600 w-full p-10 mt-10 "></div>
            <h1 className="font-bold text-8xl bg-gradient-to-r from-20% bg-clip-text text-transparent from-purple-500 to-purple-200 py-5">Chewingg...</h1>
        </div>
      </main>
  )
}
