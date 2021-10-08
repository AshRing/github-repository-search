const path = require("path");
const resolve = require("path").resolve;
const HtmlWebpackPlugin = require("html-webpack-plugin");

const runEnv = process.env.NODE_ENV || "development";

module.exports = {
	entry: path.resolve(__dirname, "./src/index.tsx"),
	output: {
		filename: "[name].bundle.js",
		path: resolve(__dirname, "dist", "github-repository-search"),
		publicPath: "/github-repository-search",
	},
	target: "web",
	mode: runEnv,
	devtool: runEnv === "production" ? "source-map" : "eval-cheap-source-map",
	devServer: {
		historyApiFallback: {
			rewrites: [
				{ from: /^\/github-repository-search/, to: "/github-repository-search/index.html" },
			],
		},
		hot: true,
		port: 9000,
		open: ["/github-repository-search"],
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
	],
};
