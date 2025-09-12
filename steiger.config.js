import fsd from '@feature-sliced/steiger-plugin'
import { defineConfig } from 'steiger'

export default defineConfig([
    ...fsd.configs.recommended,
    {
        // disable the `public-api` rule for files in the shared/composables layer
        files: ['./src/shared/composables/**'],
        rules: {
            'fsd/public-api': 'off'
        }
    }
])
