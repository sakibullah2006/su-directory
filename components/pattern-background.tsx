// components/pattern-background.tsx
"use client"

import { generatePattern } from "@/lib/pettern-utils"
import { useEffect, useRef } from "react"

interface PatternBackgroundProps {
    className?: string
    children?: React.ReactNode
    colorPrimary?: string
    colorSecondary?: string
    patternType?: "dots" | "grid" | "waves" | "hexagons" | "circuit" | "diagonal"
    size?: number
    opacity?: number
    glow?: boolean
    glowIntensity?: number
}

export function PatternBackground({
    className = "",
    children,
    colorPrimary = "#0f172a",
    colorSecondary = "#3b82f6",
    patternType = "dots",
    size = 20,
    opacity = 0.3,
    glow = false,
    glowIntensity = 5,
}: PatternBackgroundProps) {
    const containerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (containerRef.current) {
            const styleString = generatePattern({
                colorPrimary,
                colorSecondary,
                patternType,
                size,
                opacity,
                glow,
                glowIntensity,
            })

            containerRef.current.style.cssText += styleString
        }
    }, [colorPrimary, colorSecondary, patternType, size, opacity, glow, glowIntensity])

    return (
        <div ref={containerRef} className={className}>
            {children}
        </div>
    )
}