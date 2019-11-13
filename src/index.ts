// cspell:ignore gitignore npmrc

import { setFailed } from '@actions/core';
import * as semanticRelease from 'semantic-release';

import { parserOpts } from './config/parserOptions';
import { plugins } from './config/plugins';
import { transform } from './config/transform';
import { handleBranchFlag, handleDryRunFlag } from './optionsHandlers';
import { Commands, reportResults, runTask } from './tasks';

const main = async (): Promise<void> => {
  await runTask(Commands.CreateGitIgnoreBackup);

  const result = await semanticRelease({
    /* eslint-disable unicorn/prevent-abbreviations */
    ci: false,
    ...handleBranchFlag(),
    ...handleDryRunFlag(),
    ...plugins,
    parserOpts,
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
