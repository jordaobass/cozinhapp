'use client'

import Head from 'next/head';

import logoTexto from '@/assets/svg/2.svg'
import Image from "next/image";
import Link from "next/link";
import {ThemeSwitcher} from "@/components/theme/theme-switcher";


export default function Component() {
    return (
        <>
            <Head>
                {/* Importando a fonte Pacifico */}
                <link href="https://fonts.googleapis.com/css2?family=Pacifico&display=swap" rel="stylesheet"/>
            </Head>

            <div className="container mx-auto px-4 md:px-6 lg:px-8">
                <header className="flex h-20 w-full shrink-0 items-center px-4 md:px-6">


                    <div className="flex-grow flex justify-center">
                        <Link href="/home" className="cursor-pointer">
                            <Image
                                src={logoTexto}
                                className="size-48 hover:scale-105 transition-transform duration-200"
                                alt="Cozinhapp"
                            />
                        </Link>
                    </div>
                    <div className="ml-auto flex gap-2">

                        <ThemeSwitcher/>


                    </div>
                </header>
            </div>
        </>
    )
}


