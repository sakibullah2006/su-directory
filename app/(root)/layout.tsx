import Navbar, { NavBarSkeleton } from "@/components/Navbar"
import React, { Suspense } from "react"
import Loading from "./loading"

export default function MainLayout({
    children
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <>
            <Suspense fallback={<NavBarSkeleton />}>
                <Navbar />
            </Suspense>
            <main>
                <Suspense fallback={<Loading />}>
                    {children}
                </Suspense>
            </main>
        </>
    )
}
