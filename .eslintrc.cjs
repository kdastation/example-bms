const javascriptRules = {
    'no-else-return': 1,
    'symbol-description': 1,
    'no-useless-return': 1,
    'no-useless-rename': 1,
    'prefer-template': 1,
    'no-var': 2,
    'prefer-const': 2,
    'no-console': [
        2,
        {
            allow: ['warn', 'error'],
        },
    ],
    'no-param-reassign': [
        2,
        {
            props: true,
            ignorePropertyModificationsFor: ['state', 'accum', 'acc', 'draft'],
        },
    ],
    'array-callback-return': [2, { allowImplicit: true }],
    'no-constructor-return': 2,
    'no-eval': 2,
    'no-extend-native': 2,
    'no-extra-bind': 2,
    'no-extra-label': 2,
    'no-implicit-coercion': 2,
    'no-implied-eval': 2,
    'no-iterator': 2,
    'no-labels': 2,
    'no-lone-blocks': 2,
    'no-new': 2,
    'no-new-func': 2,
    'no-new-wrappers': 2,
    'no-proto': 2,
    'no-return-assign': 2,
    'no-script-url': 2,
    'no-self-compare': 2,
    'no-sequences': 2,
    'no-useless-call': 2,
    'no-useless-concat': 2,
    'prefer-rest-params': 2,
    'prefer-spread': 2,
    'no-promise-executor-return': 2,
    'no-template-curly-in-string': 2,
    'no-unreachable-loop': 2,
    yoda: 2,
}

const stylisticRules = {
    'no-lonely-if': 1,
    'prefer-object-spread': 1,
    camelcase: [2, { allow: ['^UNSAFE_'], ignoreDestructuring: false, properties: 'never' }],
    'no-array-constructor': 2,
    'no-bitwise': 2,
    'no-multi-assign': 2,
    'no-nested-ternary': 2,
    'no-unneeded-ternary': 2,
}

const importsRules = {
    'import/no-default-export': 1,
    'import/no-extraneous-dependencies': [
        1,
        {
            includeTypes: true,
            devDependencies: [
                '**/*.test.js',
                '**/*.spec.js',
                '**/*.test.ts',
                '**/*.spec.ts',
                '**/*.test.jsx',
                '**/*.spec.jsx',
                '**/*.test.tsx',
                '**/*.spec.tsx',
                '**/*.msw.ts',
                '**/*.msw.tsx',
                '**/*.fixture.ts',
                '**/*.fixture.tsx',
            ],
        },
    ],
    'import/no-commonjs': 2,
    'import/no-cycle': 2,
    'import/no-duplicates': 2,
    'import/first': 2,
    'import/no-absolute-path': 2,
    'import/no-mutable-exports': 2,
    'import/no-self-import': 2,
}

const typescriptRules = {
    '@typescript-eslint/no-explicit-any': 0,
    '@typescript-eslint/no-namespace': 0,
    '@typescript-eslint/ban-ts-comment': [
        2,
        {
            'ts-expect-error': false,
            'ts-ignore': 'allow-with-description',
        },
    ],
    '@typescript-eslint/consistent-type-imports': [
        2,
        { prefer: 'type-imports', fixStyle: 'inline-type-imports' },
    ],
    '@typescript-eslint/prefer-for-of': 1,
    '@typescript-eslint/no-unused-vars': [
        2,
        {
            varsIgnorePattern: '^_',
            argsIgnorePattern: '^_',
            caughtErrorsIgnorePattern: '^_',
            destructuredArrayIgnorePattern: '^_',
        },
    ],
    '@typescript-eslint/no-use-before-define': [
        2,
        {
            functions: false,
        },
    ],
    '@typescript-eslint/consistent-type-definitions': [2, 'type'],
}

const fsdRules = {
    '@conarti/feature-sliced/layers-slices': 2,
    '@conarti/feature-sliced/absolute-relative': 2,
    '@conarti/feature-sliced/public-api': 2,
}

const prettierRules = {
    'prettier/prettier': 2,
}

const reactRules = {
    'react/react-in-jsx-scope': 0,
    'react/display-name': 0,
    'react/prop-types': 0,
    'react/require-default-props': 0,
    'react/no-unstable-nested-components': 0,
    'react/function-component-definition': [
        2,
        {
            namedComponents: 'arrow-function',
        },
    ],
}

const jsxA11YRules = {
    'jsx-a11y/click-events-have-key-events': 1,
    'jsx-a11y/no-static-element-interactions': 1,
    'jsx-a11y/no-noninteractive-element-interactions': 1,
    'jsx-a11y/no-autofocus': [
        1,
        {
            ignoreNonDOM: false,
        },
    ],
}

const unicornRules = {
    'unicorn/filename-case': [
        2,
        {
            cases: {
                camelCase: true,
                pascalCase: true,
            },
            ignore: ['^vite-env.d.ts'],
        },
    ],
}

module.exports = {
    root: true,
    env: { browser: true, es2020: true },
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:prettier/recommended',
        'prettier',
        'plugin:import/recommended',
        'plugin:react-hooks/recommended',
        'plugin:react/recommended',
        'plugin:jsx-a11y/recommended',
    ],
    ignorePatterns: ['dist', '.eslintrc.cjs'],
    parser: '@typescript-eslint/parser',
    settings: {
        'import/parsers': {
            '@typescript-eslint/parser': ['.ts', '.tsx'],
        },
        'import/resolver': {
            typescript: {},
        },
        react: {
            version: 'detect',
        },
    },

    plugins: [
        '@conarti/feature-sliced',
        '@typescript-eslint',
        'react-hooks',
        'prettier',
        'react',
        'jsx-a11y',
        'unicorn',
    ],
    rules: {
        ...javascriptRules,
        ...stylisticRules,
        ...typescriptRules,
        ...importsRules,
        ...fsdRules,
        ...prettierRules,
        ...reactRules,
        ...jsxA11YRules,
        ...unicornRules,
    },
}
