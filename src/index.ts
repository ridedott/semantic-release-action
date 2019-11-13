import { debug, setFailed } from '@actions/core';
import * as semanticRelease from 'semantic-release';

import * as defaultConfiguration from '../config';
import { handleBranchFlag, handleDryRunFlag } from './optionsHandlers';

const main = async (): Promise<void> => {
  const result: semanticRelease.Result = await semanticRelease({
    ci: false,
    ...defaultConfiguration,
    ...handleBranchFlag(),
    ...handleDryRunFlag(),
  });

  if (result === false) {
    debug('No new release published.');

    return Promise.resolve();
  }

  const { nextRelease } = result;

  debug(
    `
      Published release type: ${nextRelease.type}.
      Version:${nextRelease.version}.
    `,
  );
};

main().catch((error: Error): void => {
  setFailed(`An unexpected error occurred: ${error}, ${error.stack}.`);
});
