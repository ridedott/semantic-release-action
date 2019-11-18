import * as core from '@actions/core';
import { exists } from 'path';

import {
  Flags,
  handleBranchFlag,
  handleDebugFlag,
  handleDryRunFlag,
  handleScriptPathFlag,
} from './handlers';

/*
 * Setup and teardown
 */

const getInputSpy = jest.spyOn(core, 'getInput');

afterEach((): void => {
  jest.clearAllMocks();
});

/*
 * Tests
 */

describe('handlers', (): void => {
  it.each([
    { branch: 'develop', expected: { branch: 'develop' } },
    { branch: 'master', expected: { branch: 'master' } },
    { branch: '', expected: {} },
  ])(
    'it should return proper branch flag object',
    (input: { branch: string; expected: { branch?: string } }): void => {
      expect.assertions(2);

      getInputSpy.mockImplementationOnce((): string => input.branch);

      expect(handleBranchFlag()).toMatchObject(input.expected);
      expect(getInputSpy).toHaveBeenCalledWith(Flags.branch);
    },
  );

  it.each([
    { dryRun: 'true', expected: { dryRun: true } },
    { dryRun: 'false', expected: { dryRun: false } },
    { dryRun: '', expected: { dryRun: false } },
  ])(
    'it should return proper dryRun flag object',
    (input: { dryRun: string; expected: { dryRun: boolean } }): void => {
      expect.assertions(2);

      getInputSpy.mockImplementationOnce((): string => input.dryRun);

      expect(handleDryRunFlag()).toMatchObject(input.expected);
      expect(getInputSpy).toHaveBeenCalledWith(Flags.dryRun);
    },
  );

  it.each([
    { debug: 'true', expected: true },
    { debug: 'false', expected: false },
    { debug: '', expected: false },
  ])(
    'it should return proper debug flag object',
    (input: { debug: string; expected: boolean }): void => {
      expect.assertions(2);

      getInputSpy.mockImplementationOnce((): string => input.debug);

      expect(handleDebugFlag()).toBe(input.expected);
      expect(getInputSpy).toHaveBeenCalledWith(Flags.debug);
    },
  );

  it.each([
    { expected: './scripts/script.sh', scriptPath: './scripts/script.sh' },
  ])(
    'it should return proper scriptPath flag object',
    async (input: { scriptPath: string; expected: string }): Promise<void> => {
      expect.assertions(2);

      getInputSpy.mockImplementationOnce((): string => input.scriptPath);

      expect(await handleScriptPathFlag()).resolves.toBe(input.expected);
      expect(getInputSpy).toHaveBeenCalledWith(Flags.scriptPath);
    },
  );
});
