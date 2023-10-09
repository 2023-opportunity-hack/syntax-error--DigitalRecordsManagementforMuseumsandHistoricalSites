import { useSession, signOut } from 'next-auth/react'
import { useState } from 'react';

import Image from 'next/image'
import Link from "next/link";

import logo from "@public/images/thumbnail-logo.png"
import logoo from "@public/images/logo.png"
import searchIcon from "@public/images/search-icon.svg"
import { useRouter } from 'next/router';
import Login from './login';
import { useParams, useSearchParams } from 'next/navigation';

export default function Search({ results }: any) {
    const { data: session } = useSession()
    const params = useSearchParams()
    const value = params.get('a')
    const [searchText, setSearchText] = useState<string | null>(value);


    if (session) {
        return (
            <main className="bg-bg font-source min-h-screen flex flex-col align-middle items-center">
                <div className="w-full max-w-6xl flex flex-row-reverse items-center py-4">
                    <button className="p-2 px-4 m-2 text-pc font-bold hover:bg-pc hover:text-bg hover:scale-[1.025] border-pc border-2 cursor-pointer rounded-sm duration-150 active:scale-100" onClick={() => { signOut() }}>Sign Out</button>
                    <Link className='font-black mr-4' href='upload'>Upload</Link>
                </div>
                <div className='flex flex-col w-11/12 max-w-3xl align-middle items-center'>
                    <div className=" text-pt font-extrabold tracking-wider w-full leading-none h-full flex flex-row items-center justify-between align-middle">
                        <Link href="/"><Image className="w-24 max-w-lg " src={logo} alt="header" /></Link>
                        <input className="shadow w-full max-w-xl border-st outline-none p-2 py-2 " placeholder="Search our repository of information" value={searchText} onChange={(e) => setSearchText(e.target.value)} />

                        <div className='flex flex-row'>
                            <Link className="rounded aspect-square text-center font-source text-bg text-lg  p-2 bg-pc py-2" href={`query?a=${searchText}`}>
                                <Image height={20} src={searchIcon} alt="search"></Image>
                            </Link>
                        </div>

                    </div>
                </div>
                <div className='max-w-3xl w-full flex items-center justify-center mt-12'>
                    <div className='bg-white w-11/12 p-4 flex flex-col'>
                        <span className='font-black'>ANSWER</span>
                        {results["answer"]}
                    </div>
                </div>
                <div className='max-w-3xl w-full flex items-center justify-center mt-12'>
                    <div className='w-11/12 p-4 flex flex-col'>
                        <span className='font-black'>SOURCES</span>
                        {results?.sources.map((source: any) => (
                            <div className='bg-white p-2 mb-12'>
                            <span><text className='font-black'>DOCUMENT ID:</text>: {source["document_id"].split('/').slice(-1)[0].replace("value-Awesome-", "").replace("pptx", "pdf").replace("searchy.pdf", "Cryptanalyst in Chief Elizebeth Smith Friedman.pptx")}</span>
                            <br/>
                            <br/>

                                <span><text className='font-black'>SOURCE:</text>: <a className='text-pc font-black' target="_blank" href={source["source"]}>Download</a></span>
                            </div>
                        ))}
                    </div>
                </div>

            </main>
        )
    }
    else {
        return <Login />
    }
}

export async function getServerSideProps({ req, res, resolvedUrl }: any) {
    const query = JSON.stringify(decodeURI(resolvedUrl).split("=")[1].replace('%3F', '?'))

    const response = await fetch('', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            "prompt": query,
            "attribute": "value",
            "attribute_value": "Awesome"
        }),
    });

    const results = await response.json()

    return { props: { results } }
}