<template>
    <div class="crosshair-generator">
        <canvas
            id="crosshair-canvas"
            ref="canvasRef"
            height="256"
            width="256"
        ></canvas>

        <div class="controls">
            <LabelWrapper
                id="crosshair_color"
                text="Настройки цвета"
            >
                <ColorPicker
                    :model-value="getColor()"
                    format="rgb"
                    @update:model-value="setColor($event)"
                />
            </LabelWrapper>

            <LabelWrapper
                id="crosshair_size"
                text="Размер"
                fluid-element
            >
                <CrosshairGeneratorSlider
                    v-model="settings.length"
                    :min="0"
                    :max="15"
                />
            </LabelWrapper>

            <LabelWrapper
                id="crosshair_thickness"
                text="Толщина"
                fluid-element
            >
                <CrosshairGeneratorSlider
                    v-model="settings.thickness"
                    :min="0"
                    :max="3"
                />
            </LabelWrapper>

            <LabelWrapper
                id="crosshair_gap"
                text="Внутренний отступ"
                fluid-element
            >
                <CrosshairGeneratorSlider
                    v-model="settings.gap"
                    :min="-5"
                    :max="5"
                />
            </LabelWrapper>

            <LabelWrapper
                id="crosshair_outline_enabled"
                text="Включить обводку"
            >
                <ToggleSwitch v-model="settings.outlineEnabled" />
            </LabelWrapper>

            <LabelWrapper
                v-if="settings.outlineEnabled"
                id="crosshair_outline"
                text="Ширина обводки"
                fluid-element
            >
                <CrosshairGeneratorSlider
                    v-model="settings.outline"
                    :min="0"
                    :max="3"
                />
            </LabelWrapper>

            <LabelWrapper
                id="crosshair_dot"
                text="Точка в центре"
            >
                <ToggleSwitch v-model="settings.centerDotEnabled" />
            </LabelWrapper>

            <LabelWrapper
                id="crosshair_dot"
                text="Т-образный прицел"
            >
                <ToggleSwitch v-model="settings.tStyleEnabled" />
            </LabelWrapper>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ColorPicker, ToggleSwitch } from 'primevue'
import { onMounted, ref, watch } from 'vue'

import type { Crosshair } from '@/widgets/CrosshairGenerator/types'

import { LabelWrapper } from '@/shared/ui'
import CrosshairGeneratorSlider from '@/widgets/CrosshairGenerator/ui/CrosshairGeneratorSlider.vue'
import { useCrosshairGenerator } from '@/widgets/CrosshairGenerator/useCrosshairGenerator'

const canvasRef = ref<HTMLCanvasElement | null>(null)

const settings = ref<Crosshair>({
    length: 5,
    red: 0,
    green: 255,
    blue: 0,
    gap: 3,
    alphaEnabled: true, // #not used
    alpha: 0, // #not used
    outlineEnabled: false,
    outline: 0,
    thickness: 1,
    centerDotEnabled: false,
    splitDistance: 0, // #not used
    fixedCrosshairGap: 0, // #not used
    innerSplitAlpha: 0, // #not used
    outerSplitAlpha: 0, // #not used
    splitSizeRatio: 0, // #not used
    tStyleEnabled: false,
    deployedWeaponGapEnabled: false, // #not used
    style: 0 // #not used
})

const { getColor, setColor, drawCrosshair } = useCrosshairGenerator(settings, canvasRef)

onMounted(() => {
    drawCrosshair()
})

watch(settings, drawCrosshair, { deep: true })
</script>

<style lang="scss">
#crosshair-canvas {
    margin: auto;
    display: block;
}

.crosshair-generator input[type='range'] {
    width: 150px;
}

.controls {
    display: grid;
    grid-template-columns: 1fr;
    gap: 16px 24px;
    background-color: var(--p-neutral-900);
    padding: 32px;
    border-radius: 24px;

    .label-wrapper__text {
        flex: 0 0 25%;
    }
}
</style>
