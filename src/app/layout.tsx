import type {Metadata} from "next";

import "./globals.css";
import {ThemeProvider} from 'next-themes'

export const metadata: Metadata = {
    title: "Cozinhapp",
    description: " ",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
        <head>
            <meta name="google-adsense-account" content="ca-pub-3660869229459383" />
            <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3660869229459383"
                 crossOrigin="anonymous"></script>
        </head>
        <body>
        <ThemeProvider
            attribute="class"
            defaultTheme="light"
            disableTransitionOnChange
        >

                {children}


        </ThemeProvider>
        </body>
        </html>
    );
}