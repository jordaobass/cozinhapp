import type {Metadata} from "next";

import "./globals.css";
import {ThemeProvider} from 'next-themes'

export const metadata: Metadata = {
    title: "Cozinhapp - Receitas Personalizadas com Seus Ingredientes",
    description: "Descubra receitas deliciosas usando os ingredientes que você tem em casa. Mais de 100+ receitas nutritivas, fáceis e econômicas para toda família.",
    keywords: "receitas com ingredientes, receitas fáceis, aproveitamento ingredientes, receitas econômicas, culinária caseira",
    authors: [{ name: "Cozinhapp" }],
    openGraph: {
        title: "Cozinhapp - Receitas Personalizadas com Seus Ingredientes",
        description: "Descubra receitas deliciosas usando os ingredientes que você tem em casa. Mais de 100+ receitas nutritivas, fáceis e econômicas.",
        url: "https://cozinhapp.com",
        siteName: "Cozinhapp",
        type: "website",
        locale: "pt_BR",
    },
    twitter: {
        card: "summary_large_image",
        title: "Cozinhapp - Receitas Personalizadas com Seus Ingredientes",
        description: "Descubra receitas deliciosas usando os ingredientes que você tem em casa.",
        creator: "@cozinhapp",
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
        },
    },
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
            
            {/* Google Analytics */}
            <script async src="https://www.googletagmanager.com/gtag/js?id=G-3MCRYK0H14"></script>
            <script
                dangerouslySetInnerHTML={{
                    __html: `
                        window.dataLayer = window.dataLayer || [];
                        function gtag(){dataLayer.push(arguments);}
                        gtag('js', new Date());
                        gtag('config', 'G-3MCRYK0H14');
                    `,
                }}
            />
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