import { setFailed } from '@actions/core';
import * as semanticRelease from 'semantic-release';

import defaultConfig from '../config';

const main = async (): Promise<void> => {
  // eslint-disable-next-line no-console
  console.log('TCL: defaultConfig', defaultConfig);

  const options: semanticRelease.Options = {
    ci: false,
    ...defaultConfig,
    branch: 'development',
    debug: true,
    dryRun: true,
  };
  const result: semanticRelease.Result = await semanticRelease(options);
  // eslint-disable-next-line no-console
  console.log('TCL: result', result);
};

main().catch((error: Error): void => {
  setFailed(`An unexpected error occurred: ${error}, ${error.stack}.`);
});
