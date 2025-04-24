// lib/pattern-utils.ts
export function generatePattern(options: {
    colorPrimary?: string
    colorSecondary?: string
    patternType?: "dots" | "grid" | "waves" | "hexagons" | "circuit" | "diagonal"
    size?: number
    opacity?: number
    glow?: boolean
    glowIntensity?: number
  }) {
    const {
      colorPrimary = "#0f172a",
      colorSecondary = "#3b82f6",
      patternType = "dots",
      size = 20,
      opacity = 0.3,
      glow = false,
      glowIntensity = 5,
    } = options
  
    // Convert hex to rgba for secondary color with opacity
    const hexToRgba = (hex: string, alpha: number) => {
      const r = Number.parseInt(hex.slice(1, 3), 16)
      const g = Number.parseInt(hex.slice(3, 5), 16)
      const b = Number.parseInt(hex.slice(5, 7), 16)
      return `rgba(${r}, ${g}, ${b}, ${alpha})`
    }
  
    const secondaryRgba = hexToRgba(colorSecondary, opacity)
    const glowFilter = glow ? `filter: drop-shadow(0 0 ${glowIntensity}px ${colorSecondary});` : ""
  
    let backgroundCss = ""
  
    switch (patternType) {
      case "waves":
        backgroundCss = `
          background-color: ${colorPrimary};
          background-image: 
            radial-gradient(circle at 100% 50%, transparent 20%, ${secondaryRgba} 21%, ${secondaryRgba} 34%, transparent 35%, transparent),
            radial-gradient(circle at 0% 50%, transparent 20%, ${secondaryRgba} 21%, ${secondaryRgba} 34%, transparent 35%, transparent);
          background-size: ${size * 2}px ${size * 2}px;
          background-position: 0 0, ${size}px ${size}px;
          ${glowFilter}
        `
        break
      // Add other pattern types as needed
      default:
        backgroundCss = `
          background-color: ${colorPrimary};
          background-image: radial-gradient(${secondaryRgba} 2px, transparent 2px);
          background-size: ${size}px ${size}px;
          ${glowFilter}
        `
    }
  
    return backgroundCss.replace(/\n\s+/g, " ").trim()
  }