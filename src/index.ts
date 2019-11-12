import { setFailed } from '@actions/core';
import * as semanticRelease from 'semantic-release';

const defaultConfig = require('../config');

const main = async (): Promise<void> => {
  // eslint-disable-next-line no-console
  console.log('TCL: defaultConfig', defaultConfig);
  const result = await semanticRelease({
    ...defaultConfig,
    branch: 'development',
    debug: true,
    dryRun: true,
  });
  // eslint-disable-next-line no-console
  console.log('TCL: result', { result });
};

main().catch((error: Error): void => {
  setFailed(`An unexpected error occurred: ${error}, ${error.stack}.`);
});
