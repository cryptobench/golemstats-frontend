import { Navbar } from "@/components/Navbar"
import "@/styles/globals.css"
import type { AppProps } from "next/app"

export default function App({ Component, pageProps }: AppProps) {
    return (
        <>
            <Navbar />
            <div className="mx-auto px-4 sm:px-6 lg:px-8 pb-10 mt-5 ">
                <Component {...pageProps} />
            </div>
        </>
    )
}
