import { useSession, signOut } from 'next-auth/react'
import { useState } from 'react';

import Image from 'next/image'
import Link from "next/link";

import logo from "@public/images/logo.png"
import { useRouter } from 'next/router';
import Login from './login';

export default function Search() {
    const { data: session } = useSession()
    const router = useRouter()
    const [searchText, setSearchText] = useState<string>("");

    if (session) {
        return (
            <main className="bg-bg font-source min-h-screen flex flex-col align-middle items-center">
                <div className="w-full max-w-6xl flex flex-row-reverse items-center py-4">
                    <button className="p-2 px-4 m-2 text-pc font-bold hover:bg-pc hover:text-bg hover:scale-[1.025] border-pc border-2 cursor-pointer rounded-sm duration-150 active:scale-100" onClick={() => { signOut() }}>Sign Out</button>
                    <Link className='font-black mr-4' href='upload'>Upload</Link>
                </div>
                <div className=" text-pt font-extrabold tracking-wider w-full leading-none mt-32 h-full flex flex-col items-center">
                    <Link href="/">

                        <Image className="w-11/12 max-w-lg rounded-lg md:rounded-3xl mt-16" src={logo} alt="header" /> </Link>
                    <input className="shadow-2xl w-11/12 max-w-xl border-st outline-none p-2 py-2 mt-10" placeholder="Search our repository of information" value={searchText} onChange={(e) => setSearchText(e.target.value)} />

                    <div className='flex flex-row w-full max-w-xl space-x-2'>
                        <Link className=" rounded text-center font-source w-full text-bg mt-6 text-lg p-2 bg-pc py-2 focus:brightness-50" href={`query?a=${searchText.replace('?', '%3F')}`}>SEARCH</Link>
                    </div>

                </div>
                <div className="max-w-4xl w-11/12 flex-row mt-72 grid grid-cols-1 md:grid-cols-2 mb-24 ">
                    <div className="max-w-xl">
                        <Image height={50} src={logo} alt="header" />
                    </div>
                    <div className="flex flex-col text-lg text-left md:text-right font-semibold">
                        <Link href="/" className="cursor-pointer font-black">HOME</Link>
                    </div>
                </div>
            </main>
        )
    }
    else {
        return <Login />
    }
}
