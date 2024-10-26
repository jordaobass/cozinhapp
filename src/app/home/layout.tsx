import Header from "@/components/header";
import Footer from "@/components/footer";


export default function AuthLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode
}>) {

    return (
        <>
            <Header/>
            <div className="flex min-h-screen mt-0 justify-center lg:px-10 sm:px-0 bg-gray-100 dark:bg-gray-900 ">
                <div className="w-full">{children}</div>
            </div>
            <Footer/>
        </>
    )
}