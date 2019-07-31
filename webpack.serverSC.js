const path = require('path');
const webpackNodeExternals = require('webpack-node-externals');

module.exports = {
    target: 'node',
    entry: './serverSC.js',
    output: {
        filename: 'bundleSC.js',
        path: path.resolve(__dirname, 'build'),
        publicPath: '/build/public'
    },
    module: {
        rules: [{
            test: /\.js$/,
            loader: 'babel-loader',
            exclude: '/node_modules',
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