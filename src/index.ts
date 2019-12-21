import { setFailed } from '@actions/core';
import * as semanticRelease from 'semantic-release';

import {
  generatePlugins,
  parserOptions,
  releaseRules,
  transform,
} from './config';
import {
  handleBranchFlag,
  handleDebugFlag,
  handleDryRunFlag,
  handleScriptPathFlag,
} from './optionsHandlers';
import { Commands, reportResults, runTask } from './tasks';

if (handleDebugFlag() === true) {
  /* eslint-disable @typescript-eslint/no-require-imports */
  /* eslint-disable-next-line global-require */
  require('debug').enable('semantic-release:*');
  /* eslint-enable @typescript-eslint/no-require-imports */
}

const main = async (): Promise<void> => {
  await runTask(Commands.PreInstallPlugins);

  const result = await semanticRelease({
    /* eslint-disable unicorn/prevent-abbreviations */
    ci: false,
    ...handleBranchFlag(),
    ...handleDryRunFlag(),
    parserOpts: parserOptions,
    plugins: generatePlugins({
      scriptPath: await handleScriptPathFlag(),
    }),
    releaseRules,
    writerOpts: { transform },
    /* eslint-enable unicorn/prevent-abbreviations */
  });

  await runTask(Commands.RemoveNpmrc);
  await reportResults(result);
};

main().catch((error: Error): void => {
  setFailed(`An unexpected error occurred: ${error}, ${error.stack}.`);
});
