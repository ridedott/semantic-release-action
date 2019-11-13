// cspell:ignore gitignore npmrc

import { setFailed } from '@actions/core';
import * as semanticRelease from 'semantic-release';

import * as defaultConfiguration from '../config';
import { plugins } from './config/plugins';
import { transform } from './config/transform';
import { handleBranchFlag, handleDryRunFlag } from './optionsHandlers';
import { Commands, reportResults, runTask } from './tasks';

const main = async (): Promise<void> => {
  await runTask(Commands.CreateGitIgnoreBackup);

  const result = await semanticRelease({
    /* eslint-disable unicorn/prevent-abbreviations */
    ci: false,
    ...defaultConfiguration,
    ...handleBranchFlag(),
    ...handleDryRunFlag(),
    parserOpts: {
      mergeCorrespondence: ['id', 'source'],
      /* eslint-disable prefer-named-capture-group */
      /* eslint-disable require-unicode-regexp */
      mergePattern: /^Merge pull request #(\d+) from (.*)$/,
      /* eslint-enable prefer-named-capture-group */
      /* eslint-enable require-unicode-regexp */
    },
    ...plugins,
    releaseRules: [{ release: 'patch', type: 'refactor' }],
    writerOpts: { transform },
    /* eslint-enable unicorn/prevent-abbreviations */
  });

  await runTask(Commands.RemoveNpmrc);
  await reportResults(result);
};

main().catch((error: Error): void => {
  setFailed(`An unexpected error occurred: ${error}, ${error.stack}.`);
});
