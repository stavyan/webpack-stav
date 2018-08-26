var path = require('path')
var webpack = require('webpack')
var htmlWebpackPlugin = require('html-webpack-plugin')
var cleanWebpackPlugin = require('clean-webpack-plugin')
// var ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
    entry: {
        vendor: ['jquery', './src/js/common'],
        index: './src/js/index.js',
        cart: './src/js/cart.js',
    },
    output: {
        path: path.join(__dirname, './dist'),
        filename: 'js/[name].js',
        publicPath: ''
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                include: path.join(__dirname, 'src'),
                exclude: /node_modules/,
                loader: "babel-loader"
            },
            {
                test: /\.css$/,
                include: path.join(__dirname, 'src'),
                exclude: /node_modules/,
                loader: "style-loader!css-loader",
            }
        ]
    },
    optimization: {
        runtimeChunk: {
            name: "manifest"
        },
        splitChunks: {
            cacheGroups: {
                commons: {
                    name: "vendor",
                    chunks: "initial",
                    minChunks: 2
                }
            }
        }
    },
    plugins: [
        new cleanWebpackPlugin(['./dist'],{
            root: path.join(__dirname, ''),
            verbose: true,
            dry: false
        }),
        new htmlWebpackPlugin({
            filename: 'index.html',
            template: './src/index.html',
            chunks: ['index', 'vendor'],
            minify: {
                removeComments: true,
                collapseWhitespace: true
            }
        }),
        new htmlWebpackPlugin({
            filename: 'cart.html',
            template: './src/cart.html',
            chunks: ['cart', 'vendor']
        }),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery'
        })
        // new ExtractTextPlugin('index.css')
    ],
    // devtool: '#source-map'
}