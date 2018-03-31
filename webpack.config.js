const path = require('path');

module.exports = {
    entry: {
        app: "./src/main.ts",
    },
    devtool: "inline-source-map",
    output: {
        filename: "app.min.js",
        path: path.resolve(__dirname, 'dist')
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js"]
    },
    module: {
        rules: [{
            test: /\.tsx?$/, // include .tsx files
            enforce: "pre", // preload the ts loader
            exclude: /node_modules/, // exclude any and all files in the node_modules folder
            use: [{
                loader: "ts-loader"
            }]
        }]
    }
};