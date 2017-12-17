module.exports = {
    entry: ['./index.js'],
    output: { filename: './bundle.js' },
    module: {
        loaders: [
            {
                exclude: /node_modules/,
                loader: 'babel-loader'
            }
        ]
    }
};
