const path = require('path');

module.exports = {
    entry: {
        app: "./src/main.ts",
    },
    devtool: "source-map",
    output: {
        filename: "app.min.js",
        path: path.resolve(__dirname, 'public/dist')
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js"]
    },
    mode: 'development',
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