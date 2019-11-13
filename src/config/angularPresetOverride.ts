import { plugins } from './plugins';
import * as transform from './transform';
// eslint-disable unicorn/prevent-abbreviations

/* eslint-disable unicorn/prevent-abbreviations */
export const options = {
  parserOpts: {
    mergeCorrespondence: ['id', 'source'],
    /* eslint-disable prefer-named-capture-group */
    /* eslint-disable require-unicode-regexp */
    mergePattern: /^Merge pull request #(\d+) from (.*)$/,
    /* eslint-enable prefer-named-capture-group */
    /* eslint-enable require-unicode-regexp */
  },
  plugins,
  releaseRules: [{ release: 'patch', type: 'refactor' }],
  writerOpts: { transform },
};
/* eslint-enable unicorn/prevent-abbreviations */
