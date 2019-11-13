import { setFailed } from '@actions/core';
import * as semanticRelease from 'semantic-release';

import * as defaultConfiguration from '../config';
import { handleBranchFlag, handleDryRunFlag } from './optionsHandlers';

const main = async (): Promise<void> => {
  const options: semanticRelease.Options = {
    ci: false,
    ...defaultConfiguration,
    ...handleBranchFlag(),
    ...handleDryRunFlag(),
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
