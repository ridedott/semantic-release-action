// cspell:ignore gitignore npmrc

import { setFailed } from '@actions/core';
import * as semanticRelease from 'semantic-release';

import * as defaultConfiguration from '../config';
import { handleBranchFlag, handleDryRunFlag } from './optionsHandlers';
import { Commands, reportResults, runTask } from './tasks';

const main = async (): Promise<void> => {
  // eslint-disable-next-line no-console
  console.log(':::: START');

  await runTask(Commands.CreateGitIgnoreBackup);

  const result = await semanticRelease({
    ci: false,
    ...defaultConfiguration,
    ...handleBranchFlag(),
    ...handleDryRunFlag(),
  });

  // eslint-disable-next-line no-console
  console.log('TCL: result', result);

  await runTask(Commands.RemoveNpmrc);
  await reportResults(result);
};

main().catch((error: Error): void => {
  setFailed(`An unexpected error occurred: ${error}, ${error.stack}.`);
});
