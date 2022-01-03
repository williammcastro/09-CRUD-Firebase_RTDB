
const HtmlWebPackPlugin    = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyPlugin           = require("copy-webpack-plugin");

const path = require('path');

module.exports = {

    mode: 'development',
    //añadida entry:...
    entry: {
        index: './src/index.js',
    },

    output: {
        clean: true,
        filename: 'main.[contenthash].js'
    },


    module: {
        rules: [
            {
                test: /\.css$/i,
                exclude: /styles.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /styles.css$/,
                use: [ MiniCssExtractPlugin.loader, 'css-loader' ]
            },
            {
                test: /\.html$/i,
                loader: 'html-loader',
                options: {
                    sources: false,
                },
            },
            {
                test: /\.(png|svg|jpe?g|gif)$/i,
                loader: 'file-loader'
            },
            {
                test: /\.js$/,
                enforce: 'pre',
                use: ['source-map-loader'],
            },
        ]
    },
    plugins: [
        new HtmlWebPackPlugin({
            title: 'Development',//añadido
            template: './src/index.html',
            filename: './index.html'
        }),
        new MiniCssExtractPlugin({
            filename: '[name].css',
            ignoreOrder: false
        }),
        new CopyPlugin({
            patterns: [
                { from: 'src/assets/', to: 'assets/' }
            ]
            
        }) 
    ]
}

