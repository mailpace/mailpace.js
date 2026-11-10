import { readFileSync } from 'node:fs';

import { describe, expect, it } from 'vitest';

import { CLIENT_VERSION } from './lib/version';

describe('CLIENT_VERSION', () => {
  it('matches the version in package.json', () => {
    const packageJson = JSON.parse(readFileSync('package.json', 'utf8')) as {
      version: string;
    };

    expect(CLIENT_VERSION).toBe(packageJson.version);
  });
});
