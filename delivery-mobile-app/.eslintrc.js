module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
    jest: true,
    jasmine: true,
    'react-native/react-native': true,
  },
  extends: [
    'prettier',
    'eslint:recommended',
    'plugin:react-native/all',
    'plugin:sonarjs/recommended',
    'plugin:react/recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: ['prettier', 'react', 'react-hooks', 'sonarjs', 'react-native'],
  rules: {
    'react-hooks/rules-of-hooks': 'error', // Checks rules of Hooks
    'react-hooks/exhaustive-deps': 'error', // Checks effect dependencies,
    'react/prop-types': 'off',
    'react/display-name': 'off',
    quotes: ['error', 'single'],
    'comma-dangle': ['error', 'always-multiline'],
    'react-native/no-raw-text': [
      2,
      {
        skip: ['MonoText'],
      },
    ],
  },
  parser: '@typescript-eslint/parser',
  settings: {
    react: {
      createClass: 'createReactClass', // Regex for Component Factory to use,
      // default to "createReactClass"
      pragma: 'React', // Pragma to use, default to "React"
      version: 'detect', // React version. "detect" automatically picks the version you have installed.
      // You can also use `16.0`, `16.3`, etc, if you want to override the detected value.
      // default to latest and warns if missing
      // It will default to "detect" in the future
      flowVersion: '0.53', // Flow version
    },
    propWrapperFunctions: [
      // The names of any function used to wrap propTypes, e.g. `forbidExtraProps`. If this isn't set, any propTypes wrapped in a function will be skipped.
      'forbidExtraProps',
      { property: 'freeze', object: 'Object' },
      { property: 'myFavoriteWrapper' },
    ],
    linkComponents: [
      // Components used as alternatives to <a> for linking, eg. <Link to={ url } />
      'Hyperlink',
      { name: 'Link', linkAttribute: 'to' },
    ],
    'import/resolver': {
      typescript: {},
      'babel-module': {},
      node: {
        extensions: ['.js', '.jsx', 'ts', '.tsx'],
      },
    },
    'import/ignore': ['react-native', 'react'],
  },
};
