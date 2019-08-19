const path = require('path');
const ROOT_DIR = path.resolve(__dirname, '..');
const SRC_DIR = path.join(ROOT_DIR, 'src');
const BUILD_DIR = path.join(ROOT_DIR, 'build');
const NODE_MODULES_DIR = path.join(ROOT_DIR, 'node_modules');
const UILIB_DIR = path.join(NODE_MODULES_DIR, '@tamm');
const isDebug = false;

module.exports = {
    target: 'node',
    entry: './client.js',
    output: {
        filename: 'client_bundle.js',
        path: path.resolve(__dirname, 'build/public'),
        publicPath: '/build/public'
    },
    
  resolve: {
    // Allow absolute paths in imports, e.g. import Button from 'components/Button'
    // Keep in sync with .flowconfig and .eslintrc
    modules: ['node_modules', 'src'],
    unsafeCache: true,
    symlinks: false,
  },
    module: {
        rules: [
            {
              test:  /\.(js|jsx)$/,
              include: [SRC_DIR, UILIB_DIR],
              loader: require.resolve('babel-loader'),
              options: {
                babelrc: false,
                presets: [
                  [
                    require.resolve('@babel/preset-env'),
                    {
                      targets: {
                        browsers: ['last 2 versions'],
                      },
                      modules: false,
                    },
                  ],
                  require.resolve('@babel/preset-flow'),
                  require.resolve('@babel/preset-react'),
                ],
                plugins: [
                  [
                    require.resolve('babel-plugin-import'),
                    {
                      libraryName: 'antd',
                      style: 'css',
                    },
                  ],
                  require.resolve('@babel/plugin-proposal-class-properties'),
                  require.resolve('@babel/plugin-syntax-dynamic-import'),
                  ...(isDebug
                    ? []
                    : [
                        require.resolve(
                          '@babel/plugin-transform-react-constant-elements',
                        ),
                        require.resolve(
                          '@babel/plugin-transform-react-inline-elements',
                        ),
                      ]),
                ],
                // This is a feature of `babel-loader` for webpack (not Babel itself).
                // It enables caching results in ./node_modules/.cache/babel-loader/
                // directory for faster rebuilds.
                cacheDirectory: true,
                // Gzipping the cache
                cacheCompression: !isDebug,
                compact: !isDebug,
              },
            },
          ],
    }
}