import { releaseRules } from './releaseRules';

export const plugins = [
  [
    '@semantic-release/commit-analyzer',
    {
      releaseRules,
    },
  ],
  '@semantic-release/release-notes-generator',
  '@semantic-release/changelog',
  '@semantic-release/npm',
  [
    '@semantic-release/git',
    {
      assets: ['dist', 'package.json', 'package-lock.json', 'CHANGELOG.md'],
      /* eslint-disable no-template-curly-in-string */
      message: 'chore(release): ${nextRelease.version} [skip ci]',
      /* eslint-enable no-template-curly-in-string */
    },
  ],
  [
    '@semantic-release/github',
    {
      failComment: false,
      releasedLabels: false,
      successComment: false,
    },
  ],
];
