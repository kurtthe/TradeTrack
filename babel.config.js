module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          root: ['./'],
          alias: {
            '@env': './environments/environment',
            '@constants': './app/shared/constants',
            '@custom-elements': './app/custom-elements',
            '@custom-sections': './app/custom-sections',
            '@screens': './app/screens',
            '@shared': './app/shared',
            '@assets': './assets',
            '@core': './app/core',
            '@navigation': './app/navigation',
            '@components': './app/components',
          },
        },
      ],
    ],
  };
};
