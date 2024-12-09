const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
// const TerserPlugin = require('terser-webpack-plugin');

const devServer = (isDev) => !isDev ? {} : {
	devServer: {
		open: true,
		hot: true,
		port: 8080,
	}
}

module.exports = ({ develop }) => ({
	mode: develop ? 'development' : 'production',
	entry: './src/index.js',

	// Из GPT оптимизация
	// performance: {
	// 	maxAssetSize: 500000, // Увеличиваем лимит до 500 KiB
	// 	hints: 'warning',     // Предупреждение вместо ошибки
	// },
	// optimization: {
	// 	minimize: true,
	// 	minimizer: [
	// 		new TerserPlugin({ // Минификация JS
	// 			terserOptions: {
	// 				compress: {
	// 					drop_console: true, // Убирает console.log
	// 				},
	// 			},
	// 		}),
	// 		new CssMinimizerPlugin(), // Минификация CSS
	// 	],
	// },
	// !!

	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'bundle.js',
		clean: true,
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: './src/index.html'
		}),
		new MiniCssExtractPlugin({
			filename: './styles/main.css'
		})
	],
	module: {
		rules: [
			{
				test: /\.(png|svg|jpg|jpeg|gif)$/i,
				type: 'asset/inline',
			},
			{
				test: /\.html$/i,
				loader: "html-loader",
			},
			{
				test: /\.css$/i,
				use: [
					MiniCssExtractPlugin.loader, 'css-loader'
				]
			},
			{
				test: /\.scss$/i,
				use: [
					MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'
				]
			},
			{
				test: /\.(woff|woff2|eot|ttf|otf)$/i,
				type: 'asset/resource',
			},
		]
	},
	...devServer(develop),
});