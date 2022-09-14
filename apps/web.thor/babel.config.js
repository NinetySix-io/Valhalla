module.exports = function (api) {
  const isSB = process.env.IS_SB;
  const isServer = api.caller((caller) => caller?.isServer);
  const isCallerDevelopment = api.caller((caller) => caller?.isDev);

  if (isSB) {
    return {};
  }

  const presets = [
    [
      'next/babel',
      {
        'preset-react': {
          importSource:
            !isServer && isCallerDevelopment
              ? '@welldone-software/why-did-you-render'
              : 'react',
        },
      },
    ],
  ];

  return { presets };
};
