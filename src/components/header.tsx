'use client'

import {Sheet, SheetTrigger, SheetContent} from "@/components/ui/sheet"
import {Button} from "@/components/ui/button"
import Link from "next/link"
import {NavigationMenu, NavigationMenuList, NavigationMenuLink} from "@/components/ui/navigation-menu"
import logoIcon from '@/assets/logo/logo_dele.png'
import Image from "next/image";
import {MenuIcon} from "lucide-react";
import {ThemeSwitcher} from "@/components/theme/theme-switcher";
import {Separator} from "@/components/ui/separator";

export default function Component() {
    return (
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
            <header className="flex h-20 w-full shrink-0 items-center px-4 md:px-6">
                <Sheet>
                    <SheetTrigger asChild>
                        <Button variant="outline" size="icon" className="lg:hidden">
                            <MenuIcon className="h-6 w-6"/>

                        </Button>
                    </SheetTrigger>
                    <SheetContent side="left" >
                        <Link href="/" prefetch={false}>
                            <Image
                                src={logoIcon}
                                className="size-16 "
                                alt="Shape Flow"
                            />
                            <span className="sr-only">Cozinhapp</span>
                        </Link>
                        <div className="grid gap-2 py-6">
                            <Link href="/"
                                  className="flex w-full items-center py-2 text-lg font-semibold"
                                  prefetch={false}>
                                Home
                            </Link>


                            {/*      <Link href="#" className="flex w-full items-center py-2 text-lg font-semibold"
                                  prefetch={false}>
                                Contact
                            </Link>*/}
                        </div>
                    </SheetContent>
                </Sheet>
                <Link href="#" className="mr-6 hidden lg:flex" prefetch={false}>
                    <Image
                        src={logoIcon}
                        className="size-16 dark:invert"
                        alt="Cozinhapp"
                    />
                    <span className="sr-only">Cozinhapp</span>
                </Link>
                <NavigationMenu className="hidden lg:flex">
                    <NavigationMenuList>
                        <NavigationMenuLink asChild>
                            <Link
                                href="/home"
                                className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-gray-100/50 data-[state=open]:bg-gray-100/50 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50 dark:data-[active]:bg-gray-800/50 dark:data-[state=open]:bg-gray-800/50"
                                prefetch={false}
                            >
                                Dicas
                            </Link>
                        </NavigationMenuLink>


                        {/*        <NavigationMenuLink asChild>
                            <Link
                                href="#"
                                className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-gray-100/50 data-[state=open]:bg-gray-100/50 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50 dark:data-[active]:bg-gray-800/50 dark:data-[state=open]:bg-gray-800/50"
                                prefetch={false}
                            >
                                Contact
                            </Link>
                        </NavigationMenuLink>*/}
                    </NavigationMenuList>
                </NavigationMenu>
                <div className="ml-auto flex gap-2">

                    <ThemeSwitcher/>
                    <Separator orientation="vertical" className="h-8"/>
                    {/*     <ProfileButton />*/}

                </div>
            </header>
        </div>
    )
}


