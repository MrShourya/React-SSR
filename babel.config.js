
// const presets =[
//   [
//     require.resolve('@babel/preset-env'),
//     {
//       targets: {
//         browsers: [
//           ">1%",
//           "last 4 versions",
//           "Firefox ESR",
//           "ie >= 11"
//         ],
//       },
//       modules: false,
//     },
//   ],
//   require.resolve('@babel/preset-flow'),
//   require.resolve('@babel/preset-react'),

// ];

// const plugins= [
//     require.resolve('@babel/plugin-proposal-class-properties'),
//     require.resolve('@babel/plugin-syntax-dynamic-import')
// ];

// module.exports = { presets,plugins };

const browsers = require('./package').browserslist;

module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: 'current',
        },
      },
    ],
  ],
  ignore: ['node_modules/(?!(@tamm|@amcharts))', 'build'],
  env: {
    test: {
      presets: [
        [
          '@babel/preset-env',
          {
            targets: {
              browsers,
            },
          },
        ],
        '@babel/preset-flow',
        '@babel/preset-react',
      ],
      plugins: [
        '@babel/plugin-proposal-class-properties',
        '@babel/plugin-syntax-dynamic-import'
      ],
    },
  },
};
