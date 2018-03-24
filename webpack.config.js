const path = require('path');

module.exports = [{
    name: "app",
    entry: "./src/main.ts",
    devtool: "inline-source-map",
    output: {
        filename: "app.min.js",
        path: path.resolve(__dirname, 'dist')
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js"]
    },
    module: {
        loaders: [
            // All files with a '.ts' or '.tsx' extension will be handled by 'ts-loader'
            { test: /\.tsx?$/, loader: "ts-loader" }
        ]
    }
},
{
    name: "test",
    entry: "./src/tests.ts",
    devtool: "inline-source-map",
    output: {
        filename: "test.min.spec.js",
        path: path.resolve(__dirname, 'dist')
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js"]
    },
    module: {
        loaders: [
            // All files with a '.ts' or '.tsx' extension will be handled by 'ts-loader'
            { test: /\.tsx?$/, loader: "ts-loader" }
        ]
    }
}]