module.exports = {
  extends: [
    'stylelint-config-standard-scss',
    'stylelint-config-prettier-scss',
    'stylelint-config-property-sort-order-smacss',
  ],
  plugins: ['stylelint-scss'],
  ignoreFiles: ['src/styles/*'],
  rules: {
    'at-rule-no-unknown': null,
    'selector-class-pattern': '^([a-z][a-z0-9]*)(-[a-z0-9]+)*$',
    'keyframes-name-pattern': /^([a-z][a-z0-9]*)(-[a-z0-9]+)*$/,
    'max-nesting-depth': 3,
    'no-descending-specificity': null,
    // 'string-quotes': 'single',
    'scss/at-rule-conditional-no-parentheses': null,
    'selector-id-pattern': null,
  },
};
