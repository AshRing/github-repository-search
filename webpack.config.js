const path = require("path");
const resolve = require("path").resolve;
const HtmlWebpackPlugin = require("html-webpack-plugin");

const runEnv = process.env.NODE_ENV || "development";

module.exports = {
	entry: "./src/index.tsx",
	output: {
		filename: "[name].[fullHash].js",
		path: resolve(__dirname, "dist"),
		publicPath: "/",
	},
	target: "web",
	mode: runEnv,
	devtool: runEnv === "production" ? "" : "eval-cheap-source-map",
	devServer: {
		historyApiFallback: true,
		hot: true,
		port: 9000,
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
			template: "src/index.html",
		}),
	],
};
