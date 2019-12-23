import { getInput } from '@actions/core';
import { exists } from 'fs';
import { promisify } from 'util';

export const existsAsync = promisify(exists);

export enum Flags {
  branch = 'BRANCH',
  dryRun = 'DRY_RUN',
  plugins = 'PLUGINS',
  scripts = 'SCRIPTS',
  debug = 'DEBUG',
  scriptPath = 'SCRIPTS_PATH',
}

export const handleBranchFlag = (): { branch: string } | {} => {
  const branch: string = getInput(Flags.branch);

  if (branch.length > 0) {
    return {
      branch,
    };
  }

  return {};
};

export const handleDryRunFlag = (): { dryRun: boolean } => {
  const dryRunInput: boolean = getInput(Flags.dryRun) === 'true';

  return { dryRun: dryRunInput === true };
};

export const handleDebugFlag = (): boolean => getInput(Flags.debug) === 'true';

export const handleScriptPathFlag = async (): Promise<string> => {
  const scriptPathInput: string = getInput(Flags.scriptPath);
  const fileExists = await existsAsync(scriptPathInput);

  return fileExists === true
    ? scriptPathInput
    : Promise.reject(
        new Error('The file specified in SCRIPTS_PATH does not exist.'),
      );
};
