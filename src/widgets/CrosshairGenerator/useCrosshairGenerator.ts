import type { Ref } from 'vue'

import { computed } from 'vue'

import type { Crosshair } from '@/widgets/CrosshairGenerator/types'

export const useCrosshairGenerator = (settings: Ref<Crosshair>, canvasRef: Ref<HTMLCanvasElement | null>) => {
    const actualLength = computed(() => settings.value.length * 2)
    const actualThickness = computed(() => settings.value.thickness + 1)
    const actualGap = computed(() => settings.value.gap + 5)

    const getColor = () => {
        return { r: settings.value.red, g: settings.value.green, b: settings.value.blue }
    }

    const setColor = (color: any) => {
        settings.value.red = color.r
        settings.value.blue = color.b
        settings.value.green = color.g
    }

    // Helper to draw a line with optional outline
    const drawLine = (ctx: CanvasRenderingContext2D, x1: number, y1: number, x2: number, y2: number) => {
        ctx.lineWidth = actualThickness.value

        ctx.beginPath()
        ctx.strokeStyle = `rgb(${settings.value.red}, ${settings.value.green}, ${settings.value.blue})`
        ctx.moveTo(x1, y1)
        ctx.lineTo(x2, y2)
        ctx.stroke()
    }

    const drawCrosshair = () => {
        const canvas = canvasRef.value
        if (!canvas) {
            return
        }

        const ctx = canvas.getContext('2d')
        if (!ctx) {
            return
        }

        const centerX = canvas.width / 2
        const centerY = canvas.height / 2

        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height)

        // Draw crosshair lines
        drawLine(ctx, centerX - actualGap.value - actualLength.value, centerY, centerX - actualGap.value, centerY) // Left
        drawLine(ctx, centerX + actualGap.value, centerY, centerX + actualGap.value + actualLength.value, centerY) // Right
        drawLine(ctx, centerX, centerY + actualGap.value, centerX, centerY + actualGap.value + actualLength.value) // Bottom
        if (!settings.value.tStyleEnabled) {
            drawLine(ctx, centerX, centerY - actualGap.value - actualLength.value, centerX, centerY - actualGap.value) // Top
        }

        // Draw center dot
        if (settings.value.centerDotEnabled) {
            ctx.fillStyle = `rgb(${settings.value.red}, ${settings.value.green}, ${settings.value.blue})`
            ctx.beginPath()
            ctx.arc(centerX, centerY, actualThickness.value / 2, 0, Math.PI * 2)
            ctx.fill()
        }
    }

    return {
        drawCrosshair,
        getColor,
        setColor
    }
}
