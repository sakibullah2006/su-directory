"use client"

import dynamic from "next/dynamic"
import { useEffect, useState } from "react"

// Dynamically import the markdown editor to avoid SSR issues
const MDEditor = dynamic(() => import("@uiw/react-md-editor").then((mod) => mod.default), {
    ssr: false,
    loading: () => <div className="h-[300px] w-full rounded-md border border-input bg-background"></div>,
})

interface MarkdownEditorProps {
    value: string
    onChange: (value: string) => void
}

export function MarkdownEditor({ value, onChange }: MarkdownEditorProps) {
    // State to handle client-side rendering
    const [mounted, setMounted] = useState(false)

    // Set mounted to true on client-side
    useEffect(() => {
        setMounted(true)
    }, [])

    return (
        <div data-color-mode="light" className="w-full">
            {mounted && (
                <MDEditor
                    value={value}
                    onChange={(val) => onChange(val || "")}
                    preview="edit"
                    height={300}
                    visibleDragbar={false}
                    className="w-full rounded-md border border-input"
                />
            )}
        </div>
    )
}
