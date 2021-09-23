const path = require("path");
const HTMLWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    entry: "./index.js",

    output: {
        filename: "[name].bundle.js",
        path: path.resolve(__dirname, "build"),
    },

    plugins: [
        new HTMLWebpackPlugin({
            template: "./index.html"
        })
    ]
}