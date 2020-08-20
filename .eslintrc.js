module.exports = {
  root: true,
  env: {
    es6: true,
  },
  extends: '@react-native-community',
  plugins: ['react-hooks'],
  rules: {
    'react/sort-comp': [
      2,
      {
        order: [
          'static-methods',
          'lifecycle',
          'trigger',
          'everything-else',
          'rendering',
        ],
        groups: {
          lifecycle: [
            'displayName',
            'propTypes',
            'contextTypes',
            'childContextTypes',
            'mixins',
            'statics',
            'defaultProps',
            'getDefaultProps',
            'getInitialState',
            'state',
            'constructor',
            'getChildContext',
            'componentWillMount',
            'componentDidMount',
            'componentWillReceiveProps',
            'shouldComponentUpdate',
            'componentWillUpdate',
            'componentDidUpdate',
            'componentWillUnmount',
          ],
          trigger: ['/^on.+$/', '/^get.+$/', '/^handle.+$/'],
          rendering: ['/^render.+$/', 'render'],
        },
      },
    ],
    'no-extra-parens': ['error', 'all', { ignoreJSX: 'all' }],
    'consistent-return': 'error',
    'default-case': 'error',
    'no-eq-null': 'error',
    'no-redeclare': 'error',
    'no-unused-expressions': 'error',
    'no-warning-comments': 'error',
    'vars-on-top': 'error',
    'wrap-iife': ['error', 'inside'],
    yoda: ['error', 'never', { onlyEquality: true }],
    'no-undefined': 'error',
    'no-use-before-define': 'error',
    'no-process-exit': 'error',
    'key-spacing': [
      'error',
      {
        beforeColon: false,
        afterColon: true,
        mode: 'strict',
      },
    ],
    'jsx-quotes': ['error', 'prefer-single'],
    'comma-spacing': ['error', { before: false, after: true }],
    'no-multi-spaces': 'error',
    'brace-style': 'error',
    camelcase: 'error',
    'func-names': ['error', 'as-needed'],
    'func-style': ['error', 'declaration', { allowArrowFunctions: true }],
    'new-cap': 'error',
    'no-nested-ternary': 'error',
    'no-lonely-if': 'error',
    'quote-props': ['error', 'as-needed'],
    semi: ['error', 'never'],
    'array-bracket-spacing': ['error', 'never'],
    'object-curly-spacing': ['error', 'always'],
    'computed-property-spacing': ['error', 'never'],
    'space-in-parens': ['error', 'never'],
    'one-var': ['error', { var: 'always', let: 'never', const: 'never' }],
    'wrap-regex': 'error',
    'no-plusplus': 'error',
    'react/jsx-boolean-value': 1,
    'react/jsx-no-comment-textnodes': 2,
    'react/no-did-mount-set-state': 0,
    'react/no-did-update-set-state': 0,
    'react/no-multi-comp': [1, { ignoreStateless: true }],
    'react/no-unknown-property': 1,
    'react/prop-types': 0,
    'react/jsx-wrap-multilines': [
      'error',
      {
        declaration: 'parens-new-line',
        assignment: 'parens-new-line',
        return: 'parens-new-line',
        arrow: 'parens-new-line',
        condition: 'parens-new-line',
        logical: 'parens-new-line',
        prop: 'parens-new-line',
      },
    ],
    'prettier/prettier': 'off',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'error',
  },
}
