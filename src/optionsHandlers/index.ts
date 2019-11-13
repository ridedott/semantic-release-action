import { getInput } from '@actions/core';

enum inputs {
  branch = 'BRANCH',
  dryRun = 'DRY_RUN',
  plugins = 'PLUGINS',
  scripts = 'SCRIPTS',
}

export const handleBranchFlag = (): { branch: string } | {} => {
  const branch = getInput(inputs.branch);

  if (branch.length > 0) {
    return {
      branch,
    };
  }

  return {};
};

export const handleDryRunFlag = (): { dryRun: boolean } => {
  const dryRun: boolean = getInput(inputs.dryRun) === 'true';

  if (dryRun === true) {
    return {
      dryRun,
    };
  }

  return {
    dryRun: false,
  };
};
