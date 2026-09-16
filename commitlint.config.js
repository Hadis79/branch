// fix:         A bug or error is being corrected in the code.
// feat:        A new feature or functionality is being added to the codebase.
// refactor:    Code is being refactored or rearranged without changing its external behavior or functionality. (neither fixes a bug nor adds a feature)
// perf:        Changes that improve performance or optimize code.
// style:       Changes are being made to the formatting, styling, or layout of code without affecting its functionality. (white-space, formatting, missing semi-colons, etc)
// build:       Changes that affect the build system or external dependencies (example scopes: gulp, broccoli, npm)
// docs:        Changes are being made to documentation, such as updating README files, help documents, or API specifications.
// test:        Adding missing tests or correcting existing tests
// ci:          Changes to our CI configuration files and scripts (example scopes: Travis, Circle, BrowserStack, SauceLabs)
// revert:      A commit that undoes a previous commit.
//conflict:     Merge conflicts

module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'body-leading-blank': [1, 'always'],
    'body-max-line-length': [2, 'always', 100],
    'footer-leading-blank': [1, 'always'],
    'footer-max-line-length': [2, 'always', 100],
    'header-max-length': [2, 'always', 150],
    'scope-case': [2, 'always', 'lower-case'],
    'subject-case': [2, 'never', ['sentence-case', 'start-case', 'pascal-case', 'upper-case']],
    'subject-empty': [2, 'never'],
    'subject-full-stop': [0, 'never', '.'],
    'type-case': [2, 'always', 'lower-case'],
    'type-empty': [2, 'never'],
    'type-enum': [
      2,
      'always',
      [
        'build',
        'chore',
        'ci',
        'docs',
        'feat',
        'fix',
        'perf',
        'refactor',
        'revert',
        'style',
        'test',
        'translation',
        'security',
        'changeset',
        'conflict',
      ],
    ],
  },
};
