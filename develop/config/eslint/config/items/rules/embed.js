/* eslint-disable no-undef */
/* eslint-disable import/no-commonjs */
/* eslint-disable unicorn/prefer-module */
/* eslint-disable no-useless-escape */

const coreRules = {
  camelias: 0,
  'no-bitwise': 0,
  'linebreak-style': 0,
  'generator-star-spacing': 0,
  'operator-linebreak': 0,
  'object-curly-newline': 0,
  'no-use-before-define': 0,
  'no-nested-ternary': 0,
  'no-spaced-func': 2,
  'no-this-before-super': 0,
  'no-var': 1,
  'sort-imports': 0,
  'jsx-quotes': ['error', 'prefer-double'],
};

const reactRules = {
  'react/sort-comp': 0,
  'react/jsx-uses-react': 2,
  'react/react-in-jsx-scope': 'off',
  'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
  'react/jsx-wrap-multilines': 0,
  'react/prop-types': 0,
  'react/forbid-prop-types': 0,
  'react/jsx-one-expression-per-line': 0,
  'react/jsx-props-no-spreading': 0,
};

const jsxRules = {
  'jsx-a11y/no-noninteractive-element-interactions': 0,
  'jsx-a11y/click-events-have-key-events': 0,
  'jsx-a11y/no-static-element-interactions': 0,
  'jsx-a11y/anchor-is-valid': 0,
};

const typescriptRules = {
  '@typescript-eslint/no-this-alias': ['off'],
  '@typescript-eslint/no-unused-vars': 0,
  '@typescript-eslint/no-invalid-this': 0,
};

const unicornRules = {
  'unicorn/filename-case': [
    'error',
    {
      cases: {
        kebabCase: true,
        camelCase: true,
        pascalCase: true,
        snakeCase: true,
      },
    },
  ],
  'unicorn/no-null': 0,
  'unicorn/no-this-assignment': 0,
};

const compatRules = {
  'compat/compat': 0,
};

const importRules = {
  'import/export': 'error',
  'import/first': 'error',
  'import/named': 'error',
  'import/newline-after-import': 'error',
  'import/no-absolute-path': 'error',
  // 开启将会极大增加检测执行时间
  'import/no-cycle': 0,
  'import/no-deprecated': 'error',
  'import/no-duplicates': 'error',
  'import/no-unresolved': 'error',
  'import/no-useless-path-segments': 'error',
  'import/no-unused-modules': 'error',
  'import/order': 0,
};

const simpleImportSortRules = {
  'simple-import-sort/imports': [
    'error',
    {
      groups: [
        [
          '^(?!taro-fast-)(?!antd-management-fast-)(?!easy-soft-)[a-zA-Z0-9]',
          '^@(?!/)',
        ],
        ['^(?!@/)(?!easy-soft-)(?!.)'],
        ['^easy-soft-'],
        ['^(?!@/)(?!antd-management-fast-)(?!.)'],
        ['^antd-management-fast-'],
        ['^(?!@/)(?!taro-fast-)(?!.)'],
        ['^taro-fast-'],
        ['^((@/).*|$)'],
        ['^\\u0000'],
        ['^\\.\\.(?!/?$)', '^\\.\\./?$'],
        ['^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$'],
        ['^.+\\.s?less$', '^.+\\.s?scss$', '^.+\\.s?css$'],
      ],
    },
  ],
  'simple-import-sort/exports': 'error',
};

module.exports = {
  rules: {
    ...coreRules,
    ...reactRules,
    ...jsxRules,
    ...typescriptRules,
    ...unicornRules,
    ...compatRules,
    ...importRules,
    ...simpleImportSortRules,
  },
};
