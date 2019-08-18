const path = require('path');
const webpackNodeExternals = require('webpack-node-externals');
const ROOT_DIR = path.resolve(__dirname, '..');
const SRC_DIR = path.join(ROOT_DIR, 'src');
const BUILD_DIR = path.join(ROOT_DIR, 'build');
const NODE_MODULES_DIR = path.join(ROOT_DIR, 'node_modules');
const UILIB_DIR = path.join(NODE_MODULES_DIR, '@tamm');
module.exports = {
    target: 'node',
    entry: './server.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'build'),
        publicPath: '/build/public'
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

    },
    externals:[webpackNodeExternals()]
}