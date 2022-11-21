const path = require("path");

const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const DefinePlugin = require("webpack").DefinePlugin;

const common = {
    entry: {
        index: "./src/index.ts",
    },

    target: ["web", "es5"],

    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: "ts-loader",
                include: [path.resolve(__dirname, "src")],
            },
        ],
    },

    resolve: {
        extensions: [".ts", ".js"],
        modules: [
            path.join(__dirname, "src"),
            path.join(__dirname, "node_modules")
        ],
        fallback: {
            fs: false,
        },
    },

    output: {
        path: path.join(__dirname, "/build/"),
        filename: "app.js",
        publicPath: "/",
    },

    plugins: [
        new CopyPlugin({
            patterns: [
                { from: "./assets", to: "./assets" },
                {
                    from: "./build_template",
                    to: "./"
                },
            ],
        }),
    ],
};

const local = {
    ...common,

    name: "local",
    mode: "development",

    devServer: {
        hot: true,
        client: {
            progress: true,
            overlay: true,
        },
        liveReload: false,
        allowedHosts: "all",
        client: {
            webSocketURL: 'ws://localhost:9004/ws',
        },
        port: 9004,
        historyApiFallback: {
            rewrites: [
                { from: "./build/app.js", to: "/app.js" },
                { from: "./build_template/index.html", to: "/index.html" },
            ],
        },
    },

    devtool: "eval-cheap-module-source-map",

    plugins: [
        ...common.plugins,
        new DefinePlugin({
            __ENVIRONMENT__: `"DEV"`,
        }),
    ],
};

const prod = {
    ...common,

    name: "prod",
    mode: "production",

    plugins: [
        new CleanWebpackPlugin(),
        ...common.plugins,
        new DefinePlugin({
            __ENVIRONMENT__: `"PROD"`,
            __TESTSTAND__: `"TRUE"`
        }),
    ]
};

module.exports = [local, prod];