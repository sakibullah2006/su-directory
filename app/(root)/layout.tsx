import Navbar from "@/components/Navbar"
import React from "react"

export default function MainLayout({
    children
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <>
            <Navbar />
            <main>
                {children}
            </main>
        </>
    )
}
