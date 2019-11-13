// cspell:ignore promisify promisified gitignore npmrc

import { debug } from '@actions/core';
import { exec } from 'child_process';
import { Result } from 'semantic-release';
import { promisify } from 'util';

const execPromisified = promisify(exec);

export enum Commands {
  CreateGitIgnoreBackup = 'createGitIgnoreBackup',
  RemoveNpmrc = 'removeNpmrc',
}

const runCommand = async (command: string): Promise<void> => {
  const { stdout, stderr } = await execPromisified(command);
  debug(stdout);

  if (stderr.length > 0) {
    throw new Error(stderr);
  }
};

export const reportResults = async (result: Result): Promise<void> => {
  if (result === false) {
    debug('No new release published.');

    // eslint-disable-next-line no-console
    console.log("TCL: 'No new release published.'");

    return;
  }

  const { nextRelease } = result;

  debug(
    `
      Published release type: ${nextRelease.type}.
      Version:${nextRelease.version}.
    `,
  );
};

export const runTask = async (task: Commands): Promise<void> => {
  switch (task) {
    case Commands.CreateGitIgnoreBackup:
      return runCommand("sed -i.bak -e '/dist/d' .gitignore");
    case Commands.RemoveNpmrc:
      return runCommand('rm -rf .npmrc');
    default:
      throw new Error(`task ${task} not found`);
  }
};
