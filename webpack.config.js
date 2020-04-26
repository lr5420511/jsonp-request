'use strict';

const [join, CleanWP, UglifyjsWP] = [
    require('path').join, 
    require('clean-webpack-plugin'),
    require('uglifyjs-webpack-plugin')
];

module.exports = {
    entry: {
        'domain-request': ['./src/index.js']
    },
    output: {
        path: join(__dirname, 'build'),
        filename: '[name].build.js'
    },
    devtool: false,
    module: {
        rules: [
            {
                test: /\.js$/i,
                loaders: ['babel-loader'],
                exclude: [/node_modules/]
            }
        ]
    },
    plugins: [new CleanWP(['./build'])],
    optimization: {
        minimizer: [
            new UglifyjsWP({
                test: /\.js$/i,
                sourceMap: false
            })
        ]
    }
};