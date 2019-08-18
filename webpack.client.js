const path = require('path');
const ROOT_DIR = path.resolve(__dirname, '..');
const SRC_DIR = path.join(ROOT_DIR, 'src');
const BUILD_DIR = path.join(ROOT_DIR, 'build');
const NODE_MODULES_DIR = path.join(ROOT_DIR, 'node_modules');
const UILIB_DIR = path.join(NODE_MODULES_DIR, '@tamm');

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
        rules: [{
            test: /\.(js|jsx)$/,
            loader: 'babel-loader',
            include: [SRC_DIR, UILIB_DIR],
            // exclude: '/node_modules',
            options: {
                presets: [
                    'react',
                    'stage-0',
                    ['env', {
                        targets: {
                            browsers: ['last 2 versions']
                        }
                    }]
                ]
            }
        }]

    }
}