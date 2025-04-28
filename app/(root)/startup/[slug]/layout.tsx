import React, { Suspense } from "react"
import Loading from "./loading"

export default function MainLayout({
    children
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <>
            <main>
                <Suspense fallback={<Loading />}>
                    {children}
                </Suspense>
            </main>
        </>
    )
}
