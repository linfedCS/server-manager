import antfu from '@antfu/eslint-config'

export default antfu({
    isInEditor: false,
    stylistic: false,
    yaml: false,
    rules: {
        '@typescript-eslint/ban-ts-comment': ['error', { 'ts-ignore': false }],
        'no-console': 'error',
        curly: 'error',

        'perfectionist/sort-imports': [
            'error',
            {
                sortSideEffects: false
            }
        ],

        'vue/block-order': [
            'error',
            {
                order: [['script', 'template'], 'style']
            }
        ],
        'vue/html-indent': 'off',
        'vue/singleline-html-element-content-newline': 'off',
        'vue/html-self-closing': 'off',
        'vue/no-root-v-if': 'error',
        'vue/no-unused-properties': 'error',

        'antfu/top-level-function': 'off',

        'vue/no-boolean-default': 'error'
    }
})
