const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader');

module.exports = {
    mode: 'development',
    entry: './app/main.js',
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'bundle.js'
    },
    resolve: {
        modules: [
            'node_modules',
            path.resolve(__dirname, "app")
        ],
        extensions: ['.js', '.css']
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                loader: 'babel-loader'
            },
            {
                test: /\.vue$/,
                use: 'vue-loader'
            },
            {
                test: /\.css$/,
                loader: [ 'style-loader', 'css-loader' ]
            }
        ]
    },
    plugins: [
        new VueLoaderPlugin(),
        new CopyWebpackPlugin([
            {
                from: '**/*',
                to: './.',
                context: './app/',
                force: true,
                ignore: ['**/*.js', '**/*.css', '**/*.scss']
            }
        ])
    ],
    devServer: {
        contentBase: path.join(__dirname, 'dist')
    },
    devtool: false
};
