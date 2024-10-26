'use client'

import Head from 'next/head';

import logoTexto from '@/assets/svg/2.svg'
import Image from "next/image";
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
                        <Image
                            src={logoTexto}
                            className="size-48"
                            alt="Cozinhapp"
                        />

                    </div>
                    <div className="ml-auto flex gap-2">

                        <ThemeSwitcher/>


                    </div>
                </header>
            </div>
        </>
    )
}


