module.exports = (api) => {
  api.cache(true);

  return {
    presets: [
      [
        '@babel/preset-env',
        {
          corejs: {
            version: 3,
            proposals: true,
          },
          useBuiltIns: 'usage',
          // TODO: Remove it when babel update to v8
          bugfixes: true,
        },
      ],
      '@babel/preset-typescript',
    ],
    plugins: [
      [
        'module-resolver',
        {
          root: ['./src'],
          alias: {
            test: './test',
          },
          // keep `.js` extension for node_modules
          extensions: ['.js', '.ts', '.tsx'],
        },
      ],
      '@babel/plugin-proposal-export-default-from',
    ],
  };
};
