module.exports = {
    'env': {
        'node': true,
        'commonjs': true,
        'es2021': true,
        'jest/globals': true
    },
    'extends': 'eslint:recommended',
    'parserOptions': {
        'ecmaVersion': 13
    },
    'rules': {
        'indent': [
            'error',
            4
        ],
        'quotes': [
            'error',
            'single'
        ],
        'semi': [
            'error',
            'never'
        ]
    },
    'plugins': ['jest']
}
