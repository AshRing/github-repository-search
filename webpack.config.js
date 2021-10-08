const path = require("path");
const resolve = require("path").resolve;
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const runEnv = process.env.NODE_ENV || "development";

module.exports = {
	entry: path.resolve(__dirname, "./src/index.tsx"),
	output: {
		filename: "[name].bundle.js",
		path: resolve(__dirname, "dist"),
		publicPath: "/",
	},
	target: "web",
	mode: runEnv,
	devtool: runEnv === "production" ? "source-map" : "eval-cheap-source-map",
	devServer: {
		historyApiFallback: true,
		hot: true,
		port: 9000,
		open: ["/"],
	},
	resolve: {
		extensions: [".ts", ".tsx", ".js", ".json"],
	},
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				loader: "babel-loader",
				exclude: /node_modules/,
			},
		],
	},
	plugins: [
		new HtmlWebpackPlugin({
			filename: "index.html",
			template: "./src/index.html",
		}),
		new CopyPlugin({
			patterns: [{ from: path.resolve(__dirname, "_redirects"), to: "dist" }],
		}),
	],
};
