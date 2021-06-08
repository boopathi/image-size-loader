/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const { pathsToModuleNameMapper } = require('ts-jest/utils');

const { compilerOptions } = require('./tsconfig.json');

// SEE: https://kulshekhar.github.io/ts-jest/user/config/#jest-config-with-helper
const mappingFromTsConfig = pathsToModuleNameMapper(compilerOptions.paths, {
  prefix: '<rootDir>/src/',
});

module.exports = {
  collectCoverageFrom: [
    'src/**/*.(ts|tsx)',
    // Exclude files from coverage because they are not shipped to the final users
    '!src/**/*.type.ts',
    '!src/**/*.d.ts',
  ],
  projects: [
    {
      displayName: 'server',
      moduleDirectories: ['node_modules', '<rootDir>/src', '<rootDir>/test'],
      moduleNameMapper: {
        ...mappingFromTsConfig,
      },
      preset: 'ts-jest',
      rootDir: path.join(__dirname),
      roots: ['<rootDir>/src'],
      testEnvironment: 'node',
      transform: {
        '\\.(jpe?g|png|gif)$': '<rootDir>/test/fileTransformer.js',
      },
    },
  ],
};
