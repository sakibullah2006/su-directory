"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function SearchBar({ initialQuery }: { initialQuery?: string }) {
    const [query, setQuery] = useState(initialQuery || "")
    const router = useRouter()

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (query.trim()) {
            router.push(`/?query=${encodeURIComponent(query)}`)
        }
    }

    return (
        <form onSubmit={handleSubmit} className="relative flex w-full h-12 items-center ">
            <Input
                type="text"
                placeholder="Search..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="pr-10 rounded-r-nonoe rounded-l-full w-full h-full bg-gray-50 text-slate-950 dark:text-slate-50   opacity-100"
                aria-label="Search query"
            />
            <Button type="submit" variant="default" size="icon" className="rounded-l-none h-full" aria-label="Search">
                <Search className="h-4 w-4" />
            </Button>
        </form>
    )
}
