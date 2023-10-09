import { useSession, signOut } from 'next-auth/react'
import { FormEvent, useState } from 'react'

import Image from 'next/image'
import Link from "next/link";

import logo from "@public/images/logo.png"
import { useRouter } from 'next/router';
import Login from './login';

export default function Search({ data }) {
    const { data: session } = useSession()
    const [file, setFile] = useState<File>()
    const [t, setT] = useState<string>("hidden")
    const [a, setA] = useState<string>("focus:brightness-50")
    const router = useRouter()

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!file) return

        try {
            const initial = await fetch('https://jiipndy03j.execute-api.us-east-1.amazonaws.com/prod/url', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    "name": file.name,
                    "attribute": "value",
                    "attribute_value": "Awesome"
                }),
            });

            const initialResult = await initial.json()
            const data = new FormData()
            data.append('key', initialResult['fields']['key'])
            data.append('AWSAccessKeyId', initialResult['fields']['AWSAccessKeyId'])
            data.append('x-amz-security-token', initialResult['fields']['x-amz-security-token'])
            data.append('policy', initialResult['fields']['policy'])
            data.append('signature', initialResult['fields']['signature'])
            data.append('file', file)
            console.log(initialResult['fields']['key'])
            console.log(initialResult['fields']['AWSAccessKeyId'])
            console.log(initialResult['fields']['x-amz-security-token'])
            console.log(initialResult['fields']['policy'])
            console.log(initialResult['fields']['signature'])

            const res = await fetch(initialResult['url'], {
                method: 'POST',
                body: data,
                redirect: 'follow'
            })
            const result = await res.json()
        } catch (e: any) {
            // Handle errors here
            console.error(e)
        }
    }
    const onUpload = () => {
        setTimeout(()=>{
            setT("")
            setA("")
        }, 2000)
    }
    if (session) {
        return (
            <main className="bg-bg font-source min-h-screen flex flex-col align-middle items-center">
                <div className="w-full max-w-6xl flex flex-row-reverse items-center py-4">
                    <button className="p-2 px-4 m-2 text-pc font-bold hover:bg-pc hover:text-bg hover:scale-[1.025] border-pc border-2 cursor-pointer rounded-sm duration-150 active:scale-100" onClick={() => { signOut() }}>Sign Out</button>
                    <Link className='font-black mr-4' href='search'>Search</Link>
                </div>
                <form onSubmit={onSubmit} className=" text-pt font-extrabold tracking-wider w-full leading-none mt-32 h-full flex flex-col items-center">
                    <Image className="w-11/12 max-w-lg rounded-lg md:rounded-3xl mt-16" src={logo} alt="header" />

                    <label for="fileInput" class="cursor-pointer bg-green mt-8 text-white py-2 px-4 rounded-lg">
                        <span>Select a File</span>
                        <input
                            id="fileInput"
                            type="file"
                            className="hidden"
                            onChange={(e) => setFile(e.target.files?.[0])}
                        />
                    </label>
                    <span>{file?.name}</span>

                    <div className='flex flex-row w-full max-w-xl space-x-2 justify-center'>
                        <button className={`rounded text-center font-source w-11/12 text-bg mt-6 text-lg  p-2 bg-pc py-2 ${a}`} onClick={onUpload}>UPLOAD</button>
                    </div>
                    <div className={`bg-green p-2 mt-2 ${t}`}>Successfully uploaded document</div>
                </form>
            </main>
        )
    }
    else {
        return <Login />
    }
}

export async function getStaticProps() {
    const res = await
        fetch("");
    const data = await res.json();
    return {
        props: {
            data,
        },
        revalidate: 30,
    }
}