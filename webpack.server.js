const path = require('path');
const webpackNodeExternals = require('webpack-node-externals');
const ROOT_DIR = path.resolve(__dirname);
const SRC_DIR = path.join(ROOT_DIR, 'src');
const BUILD_DIR = path.join(ROOT_DIR, 'build');
const NODE_MODULES_DIR = path.join(ROOT_DIR, 'node_modules');
const UILIB_DIR = path.join(NODE_MODULES_DIR, '@tamm');
const isDebug = true;
const excludeFiles = [
    /\.spec\.js$/,
    /test\.js$/,
    /\.js\.snap$/,
    /__snapshots__/,
    /.*\.story\.js$/,
  ];
    
const jsRegex = /\.(js|jsx)$/;
const lessRegex = /\.less$/;
const cssRegex = /\.css$/;

const getStyleLoaders = (cssOptions, preProcessor, preProcessorOptions) => {
    const loaders = [
      {
        loader:require.resolve('style-loader'),
      },
      {
        loader: require.resolve('css-loader'),
        options: cssOptions,
      },
    ];
  
    if (preProcessor) {
      loaders.push({
        loader: require.resolve(preProcessor),
        options: preProcessorOptions,
      });
    }
  
    return loaders;
  };

module.exports = {
    target: 'node',
    entry: './server.js',
    // devtool:'cheap-module-source-map',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'build'),
        publicPath: '/build/public'
    },
    module: {
        rules: [{
            test: jsRegex,
            loader: require.resolve('babel-loader'),
            // include: [SRC_DIR, UILIB_DIR],
            // exclude: [...excludeFiles],
            // exclude: [/node_modules\/(?![\@tamm])/],
            options: {
              presets: [
                require.resolve('@babel/preset-env'),
                require.resolve('@babel/preset-react'),
                require.resolve('@babel/preset-flow')
            ],
            plugins: [
                require.resolve('@babel/plugin-proposal-class-properties'),
                require.resolve('@babel/plugin-syntax-dynamic-import')
            ],
            }  
        },{
            test: cssRegex,
            // include: [SRC_DIR, UILIB_DIR],
            use: getStyleLoaders({
              importLoaders: 1,
              sourceMap: isDebug,
              localIdentName: isDebug
                ? '[name]-[local]-[hash:base64:5]'
                : '[hash:base64:5]',
            }),
          },
          {
            test: lessRegex,
            // include: [SRC_DIR, UILIB_DIR],
            use: getStyleLoaders(
              {
                importLoaders: 2,
                sourceMap: isDebug,
                localIdentName: isDebug
                  ? '[name]-[local]-[hash:base64:5]'
                  : '[hash:base64:5]',
              },
              'less-loader',
              { javascriptEnabled: true },
            ),
          },]

    },
    externals:[webpackNodeExternals()]
}