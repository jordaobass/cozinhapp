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
        <body>
        <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            disableTransitionOnChange
        >
            {children}
        </ThemeProvider>
        </body>
        </html>
    );
}