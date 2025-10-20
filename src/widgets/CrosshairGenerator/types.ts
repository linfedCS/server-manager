export interface Crosshair {
    length: number
    red: number
    green: number
    blue: number
    gap: number
    alphaEnabled: boolean
    alpha: number
    outlineEnabled: boolean
    outline: number
    thickness: number
    centerDotEnabled: boolean
    splitDistance: number
    fixedCrosshairGap: number
    innerSplitAlpha: number
    outerSplitAlpha: number
    splitSizeRatio: number
    tStyleEnabled: boolean
    deployedWeaponGapEnabled: boolean
    /**
     * 0 => Default
     * 1 => Default static
     * 2 => Classic
     * 3 => Classic dynamic
     * 4 => Classic static
     */
    style: number
}
