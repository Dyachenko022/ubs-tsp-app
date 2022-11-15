module.exports = {
    'env': {
        'es2021': true,
        'node': true
    },
    'extends': [
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking',
    ],
    'parser': '@typescript-eslint/parser',
    'parserOptions': {
        project: './tsconfig.json',
        'ecmaFeatures': {
            'jsx': true
        },
        'ecmaVersion': 12,
        'sourceType': 'module'
    },
    'plugins': [
        'react',
        '@typescript-eslint'
    ],
    'rules': {
        '@typescript-eslint/explicit-module-boundary-types': 'off',

        'indent': [
            'warn',
            2,
            { "SwitchCase": 1 }
        ],
        'linebreak-style': [
            'error',
            'unix'
        ],
        'quotes': [
            'error',
            'single'
        ],
        'semi': [
            'error',
            'always'
        ],
        "no-unused-vars": 'off',
        "@typescript-eslint/no-unused-vars": ["warn", { args: 'none'}]
    }
};
