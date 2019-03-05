const path = require('path')
const webpack = require('webpack')

const config = {
    mode: "production",
    entry: { app: './src/App.jsx' },
    output: {
        path: path.join(path.resolve(__dirname), '/dist'),
        filename: '[name]-bundle.js',
        publicPath: "/dist/"
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                include: path.resolve(__dirname, 'src'),
                use: [
                    'babel-loader'
                ]
            },
            {
                test: /\.(ttf|eot|svg|gif|jpg|png)(\?[\s\S]+)?$/,
                use: 'file-loader'
            }
        ]
    },
    devServer: {
        compress: true,
        disableHostCheck: true,   // That solved it
    }
}

module.exports = config
