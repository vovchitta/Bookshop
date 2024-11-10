const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'main.js'
    },
    plugins: [new MiniCssExtractPlugin()],
    devServer: {
        static: './dist',
        port: 3000,
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
}