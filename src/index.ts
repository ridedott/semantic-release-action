import { getInput, setFailed } from '@actions/core';
import * as semanticRelease from 'semantic-release';

import * as defaultConfiguration from '../config';

const branch = getInput('BRANCH');

// eslint-disable-next-line no-console
console.log('TCL: branch', branch);
const dryRun = getInput('DRY_RUN');

const main = async (): Promise<void> => {
  const options: semanticRelease.Options = {
    ci: false,
    ...defaultConfiguration,
    branch: typeof branch === 'string' ? branch : 'master',
    dryRun,
  };
  // eslint-disable-next-line no-console
  console.log('TCL: options', options);

  const result: semanticRelease.Result = await semanticRelease(options);
  // eslint-disable-next-line no-console
  console.log('TCL: result', result);
};

main().catch((error: Error): void => {
  setFailed(`An unexpected error occurred: ${error}, ${error.stack}.`);
});
