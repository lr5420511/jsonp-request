'use strict';

const [join, CleanWP] = [
    require('path').join, require('clean-webpack-plugin')
];

module.exports = {
    entry: {
        'domain-request': ['./src/index.js']
    },
    output: {
        path: join(__dirname, 'build'),
        filename: '[name].build.js'
    },
    devtool: 'source-map',
    module: {
        rules: [
            {
                test: /\.js$/,
                loaders: ['babel-loader']
            }
        ]
    },
    plugins: [new CleanWP(['./build'])]
};