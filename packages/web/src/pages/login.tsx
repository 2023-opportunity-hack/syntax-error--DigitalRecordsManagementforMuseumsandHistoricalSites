import { useSession, signIn } from 'next-auth/react'
import { useRouter } from 'next/router'
import Image from 'next/image'
import Link from "next/link";

import logo from "@public/images/thumbnail-logo.png"
import googleLogo from "@public/images/google-logo.svg"

export default function Login() {
    return (
        <main className="flex h-screen flex-col items-center justify-center bg-bg p-4 text-pt">
            <Link href="/">
                <Image height={100} src={logo} alt="header" />
            </Link>
            <span className="mt-10 font-display text-2xl font-bold tracking-widest">
                LOGIN
            </span>
            <span className="mb-8 font-display text-st font-bold tracking-widest">
                Welcome back
            </span>
            <span className="mb-6 flex w-full max-w-xl flex-col justify-between space-y-4">
                <button
                    className="flex-1 bg-pc text-white flex flex-row items-center justify-center space-x-4 rounded px-4 py-3 font-sans font-semibold transition-all duration-75 hover:scale-[100.5%] active:scale-100 bg-[#ffb869]"
                    type="button"
                    onClick={() => signIn('google', { callbackUrl: '/search' })}
                >
                    <Image height={25} src={googleLogo} alt="header" />
                    <span>Sign in with Google</span>
                </button>
            </span>
        </main>
    )
}