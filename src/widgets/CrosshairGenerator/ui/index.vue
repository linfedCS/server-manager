<template>
    <div class="crosshair-generator flex flex-col items-center gap-4 p-4 bg-gray-900 text-white rounded-2xl max-w-md mx-auto">
        <h2 class="text-xl font-semibold">CS2 Crosshair Generator</h2>

        <canvas
            ref="canvasRef"
            width="256"
            height="256"
            class="border border-gray-600 rounded-lg bg-black"
        ></canvas>

        <div class="controls w-full flex flex-col gap-2">
            <label class="flex justify-between items-center">
                Color:
                <input
                    v-model="settings.color"
                    type="color"
                    class="w-20 h-8 rounded"
                />
            </label>

            <label class="flex justify-between items-center">
                Size:
                <input
                    v-model.number="settings.size"
                    type="range"
                    min="1"
                    max="20"
                />
                <span>{{ settings.size }}</span>
            </label>

            <label class="flex justify-between items-center">
                Thickness:
                <input
                    v-model.number="settings.thickness"
                    type="range"
                    min="1"
                    max="6"
                />
                <span>{{ settings.thickness }}</span>
            </label>

            <label class="flex justify-between items-center">
                Gap:
                <input
                    v-model.number="settings.gap"
                    type="range"
                    min="0"
                    max="20"
                />
                <span>{{ settings.gap }}</span>
            </label>

            <label class="flex justify-between items-center">
                Outline:
                <input
                    v-model="settings.outline"
                    type="checkbox"
                />
            </label>

            <label class="flex justify-between items-center">
                Center Dot:
                <input
                    v-model="settings.dot"
                    type="checkbox"
                />
            </label>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'

import type { Crosshair } from '@/widgets/CrosshairGenerator/types'

const canvasRef = ref<HTMLCanvasElement | null>(null)

const settings = ref<Crosshair>({
    length: 10,
    red: 0,
    green: 255,
    blue: 0,
    gap: 5,
    alphaEnabled: true,
    alpha: 0,
    outlineEnabled: false,
    outline: 0,
    color: 1,
    thickness: 2,
    centerDotEnabled: true,
    splitDistance: 0,
    fixedCrosshairGap: 0,
    innerSplitAlpha: 0,
    outerSplitAlpha: 0,
    splitSizeRatio: 0,
    tStyleEnabled: false,
    deployedWeaponGapEnabled: false,
    style: 0
})

const drawCrosshair = () => {
    const canvas = canvasRef.value
    if (!canvas) {
        return
    }
    const ctx = canvas.getContext('2d')
    if (!ctx) {
        return
    }

    const { color, length, thickness, gap, centerDotEnabled: dot, outline } = settings.value
    const centerX = canvas.width / 2
    const centerY = canvas.height / 2

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Helper to draw a line with optional outline
    const drawLine = (x1: number, y1: number, x2: number, y2: number) => {
        if (outline) {
            ctx.strokeStyle = 'black'
            ctx.lineWidth = thickness + 2
            ctx.beginPath()
            ctx.moveTo(x1, y1)
            ctx.lineTo(x2, y2)
            ctx.stroke()
        }

        ctx.strokeStyle = color
        ctx.lineWidth = thickness
        ctx.beginPath()
        ctx.moveTo(x1, y1)
        ctx.lineTo(x2, y2)
        ctx.stroke()
    }

    // Draw crosshair lines
    drawLine(centerX - gap - length, centerY, centerX - gap, centerY) // Left
    drawLine(centerX + gap, centerY, centerX + gap + length, centerY) // Right
    drawLine(centerX, centerY - gap - length, centerX, centerY - gap) // Top
    drawLine(centerX, centerY + gap, centerX, centerY + gap + length) // Bottom

    // Draw center dot
    if (dot) {
        if (outline) {
            ctx.fillStyle = 'black'
            ctx.beginPath()
            ctx.arc(centerX, centerY, thickness / 2 + 1, 0, Math.PI * 2)
            ctx.fill()
        }

        ctx.fillStyle = color
        ctx.beginPath()
        ctx.arc(centerX, centerY, thickness / 2, 0, Math.PI * 2)
        ctx.fill()
    }
}

onMounted(() => {
    drawCrosshair()
})

watch(settings, drawCrosshair, { deep: true })
</script>

<style scoped>
.crosshair-generator input[type='range'] {
    width: 150px;
}
</style>
