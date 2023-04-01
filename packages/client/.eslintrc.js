module.exports = {
  // https://eslint.org/docs/user-guide/configuring#configuration-cascading-and-hierarchy
  // This option interrupts the configuration hierarchy at this file
  // Remove this if you have an higher level ESLint config file (it usually happens into a monorepos)
  root: true,

  // https://eslint.vuejs.org/user-guide/#how-to-use-a-custom-parser
  // Must use parserOptions instead of "parser" to allow vue-eslint-parser to keep working
  // `parser: 'vue-eslint-parser'` is already included with any 'plugin:vue/**' config and should be omitted
  parserOptions: {
    parser: require.resolve('@typescript-eslint/parser'),
    extraFileExtensions: [ '.vue' ]
  },

  env: {
    browser: true,
    es2021: true,
    node: true,
    'vue/setup-compiler-macros': true
  },

  // Rules order is important, please avoid shuffling them
  extends: [
    // Base ESLint recommended rules
    // 'eslint:recommended',

    // https://github.com/typescript-eslint/typescript-eslint/tree/master/packages/eslint-plugin#usage
    // ESLint typescript rules
    'plugin:@typescript-eslint/recommended',

    // Uncomment any of the lines below to choose desired strictness,
    // but leave only one uncommented!
    // See https://eslint.vuejs.org/rules/#available-rules
    //'plugin:vue/vue3-essential', // Priority A: Essential (Error Prevention)
    // 'plugin:vue/vue3-strongly-recommended', // Priority B: Strongly Recommended (Improving Readability)
     'plugin:vue/vue3-recommended', // Priority C: Recommended (Minimizing Arbitrary Choices and Cognitive Overhead)

    // https://github.com/prettier/eslint-config-prettier#installation
    // usage with Prettier, provided by 'eslint-config-prettier'.
    'prettier'
  ],

  plugins: [
    // required to apply rules which need type information
    '@typescript-eslint',

    // https://eslint.vuejs.org/user-guide/#why-doesn-t-it-work-on-vue-files
    // required to lint *.vue files
    'vue'

    // https://github.com/typescript-eslint/typescript-eslint/issues/389#issuecomment-509292674
    // Prettier has not been included as plugin to avoid performance impact
    // add it as an extension for your IDE

  ],

  globals: {
    ga: 'readonly', // Google Analytics
    cordova: 'readonly',
    __statics: 'readonly',
    __QUASAR_SSR__: 'readonly',
    __QUASAR_SSR_SERVER__: 'readonly',
    __QUASAR_SSR_CLIENT__: 'readonly',
    __QUASAR_SSR_PWA__: 'readonly',
    process: 'readonly',
    Capacitor: 'readonly',
    chrome: 'readonly'
  },


  // add your custom rules here
  rules: {
    'no-redeclare': 'off',

    'prefer-promise-reject-errors': 'off',
       // --- Vue ---
       'vue/eqeqeq': 'error',
       'vue/block-lang': [
         'error',
         { script: { lang: 'ts' }, style: { lang: 'scss' } },
       ],
       'vue/component-name-in-template-casing': ['error'],
       'vue/custom-event-name-casing': 'warn',
       'vue/html-comment-content-spacing': 'warn',
       'vue/html-comment-indent': 'warn',
       'vue/html-comment-content-newline': 'warn',
       'vue/no-deprecated-v-is': 'error',
       'vue/no-duplicate-attr-inheritance': 'error',
       'vue/no-empty-component-block': 'warn',
       'vue/no-static-inline-styles': 'warn',
       'vue/no-unsupported-features': ['error', { version: '3.2.0' }],
       'vue/no-unused-properties': ['warn', { groups: ['props', 'setup'] }],
       'vue/no-useless-v-bind': 'warn',
       'vue/first-attribute-linebreak': 'warn',
       'vue/attributes-order': 'warn',
       'vue/padding-line-between-blocks': 'warn',
       'vue/require-emit-validator': 'warn',
       'vue/require-name-property': 'warn',
       'vue/no-empty-component-block': 'warn',
       'vue/v-for-delimiter-style': 'warn',
       'vue/v-on-event-hyphenation': 'error',
       'vue/multi-word-component-names': ['error', {
        'ignores': ['default']
      }],



    quotes: ['warn', 'single', { avoidEscape: true }],

    // this rule, if on, would require explicit return type on the `render` function
    '@typescript-eslint/explicit-function-return-type': 'off',

    // in plain CommonJS modules, you can't use `import foo = require('foo')` to pass this rule, so it has to be disabled
    '@typescript-eslint/no-var-requires': 'off',

    // The core 'no-unused-vars' rules (in the eslint:recommended ruleset)
    // does not work with type definitions
    'no-unused-vars': 'off',

    // allow debugger during development only
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off'
  },


  overrides: [
    // Pages are not used as components directly by developers, so they don't necessarily need to have multi word component names
    {
      files: ['src/pages/**/*.vue'],
      rules: {
        'vue/multi-word-component-names': 0,
      },
    },
    {
      files: ['**/*.spec.{js,ts}'],

    },
  ],

}
