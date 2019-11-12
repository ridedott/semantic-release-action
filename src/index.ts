import { setFailed } from '@actions/core';
import * as semanticRelease from 'semantic-release';

import * as defaultConfig from '../config';

// eslint-disable-next-line capitalized-comments
// import {repositoryUrl} from '../package.json'

const main = async (): Promise<void> => {
  const options: semanticRelease.Options = {
    ci: false,
    ...defaultConfig,
    branch: 'development',
    debug: true,
    dryRun: true,
    repositoryUrl: 'https://github.com/ridedott/semantic-release-action',
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
