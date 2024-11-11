const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'main.js'
    },
    plugins: [new MiniCssExtractPlugin(),
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: 'index.html',
        })
    ],
    devServer: {
        static: './dist',
        port: 3000,
        hot: true,
        watchFiles: ['./src/index.html'],
    },
    mode: 'development',
    module: {
        rules: [
        {
            test: /\.scss$/i,
            use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
        },
        ],
    },
    optimization: {
        minimizer: [
        `...`,
        new CssMinimizerPlugin(),
        ],
    },
}