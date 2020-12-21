const path = require("path");
const { merge } = require("webpack-merge");
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require("html-webpack-plugin");

const modeConfig = (env) => require(`./scripts/webpack.${env}`)(env);

module.exports = ({ mode } = { mode: "prod" }) => {
    return merge({
        entry: path.resolve(__dirname, "src/index.js"),
        output: {
            path: path.resolve(__dirname, "dist"),
            filename: "[chunkhash].bundle.js",
        },
        module: {
            rules: [
                {
                    test: /\.html$/i,
                    use: ["html-loader"],
                },
                {
                    test: /\.css$/i,
                    use: ["style-loader", "css-loader"],
                },
                {
                    test: /\.(js|jsx)$/i,
                    exclude: /node_modules/,
                    use: ["babel-loader"],
                },
                {
                    test: /\.(png|svg|jpe?g|gif)$/,
                    use: ["file-loader"],
                },
                {
                    test: /\.(glsl|vs|fs|vert|frag)$/,
                    use: ["raw-loader", "glslify-loader"],
                },
            ],
        },
        plugins: [
            new CopyWebpackPlugin({ patterns: [{ from: path.resolve(__dirname, "public") }] }),
            new HtmlWebpackPlugin({ template: path.resolve(__dirname, "src/index.html") })
        ],
    }, modeConfig(mode));
}
