import { useSession, signOut } from 'next-auth/react'

import Image from 'next/image'
import Link from "next/link";

import logo from "@public/images/logo.png"

export default function Home() {
  const { data: session } = useSession()

  const authButton = () => {
    if (session) {
      return (<button className="p-2 px-4 m-2 text-pc font-bold hover:bg-pc hover:text-bg hover:scale-[1.025] border-pc border-2 cursor-pointer rounded-sm duration-150 active:scale-100" onClick={() => signOut()}>Sign Out</button>)
    }
    else {
      return <Link className="p-2 px-6 m-2 text-pc font-bold hover:bg-pc hover:text-bg hover:scale-[1.025] border-pc border-2 cursor-pointer rounded-sm duration-150 active:scale-100" href="login">Login</Link>
    }
  }

  return (
    <main className="bg-bg font-source min-h-screen flex flex-col align-middle items-center">
      <div className="w-full max-w-6xl flex flex-row-reverse items-center py-4">

        {authButton()}
      </div>
      <div className=" text-pt font-extrabold tracking-wider leading-none mt-32 h-full flex flex-col items-center">
        <Image className="w-11/12 max-w-4xl rounded-lg md:rounded-3xl mt-16" src={logo} alt="header" />
        <div className="text-center font-source w-11/12 max-w-2xl text-pt mt-6 text-lg text-white bg-pc py-2">SEARCH ENGINE</div>
      </div>
      <div className="max-w-4xl w-11/12 flex-row mt-72 grid grid-cols-1 md:grid-cols-2 mb-24 ">
        <div className="max-w-xl">
          <Image height={75} src={logo} alt="header" />
        </div>
        <div className="flex flex-col text-lg text-left md:text-right font-semibold">
          <Link href="/" className="cursor-pointer font-black">HOME</Link>
        </div>
      </div>
    </main>
  )
}
