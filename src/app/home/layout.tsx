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
            <div className="flex min-h-lvh mt-0 justify-center lg:px-4 sm:px-0">
                <div className="w-full">{children}</div>
            </div>
            <Footer/>
        </>
    )
}