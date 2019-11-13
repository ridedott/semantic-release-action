// cspell:ignore gitignore npmrc

import { setFailed } from '@actions/core';
import * as semanticRelease from 'semantic-release';

import * as defaultConfiguration from '../config';
import { handleBranchFlag, handleDryRunFlag } from './optionsHandlers';
import { Commands, reportResults, runTask } from './tasks';

const main = async (): Promise<void> => {
  await runTask(Commands.CreateGitIgnoreBackup);

  const result = await semanticRelease({
    branch: 'development',
    ci: false,
    ...defaultConfiguration,
    ...handleBranchFlag(),
    ...handleDryRunFlag(),
  });

  await runTask(Commands.RemoveNpmrc);
  await reportResults(result);
};

main().catch((error: Error): void => {
  setFailed(`An unexpected error occurred: ${error}, ${error.stack}.`);
});
