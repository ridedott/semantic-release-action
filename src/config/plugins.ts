import { env } from 'process';
import { PluginSpec } from 'semantic-release';

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
  [
    '@semantic-release/exec',
    { cmd: `npx prettier --write ${env.CHANGELOG_PATH}` },
    // { cmd: 'npx prettier --write ../../CHANGELOG.md' },
  ],
  '@semantic-release/npm',
  [
    '@semantic-release/git',
    {
      assets: ['dist', 'package.json', 'package-lock.json', 'CHANGELOG.md'],
      message: 'chore(release): ${nextRelease.version}',
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
] as PluginSpec[];
