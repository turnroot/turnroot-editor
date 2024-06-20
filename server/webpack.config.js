import path from 'path'

export default {
    entry: './view/start.js',
    target: 'web',
    output: {
        filename: 'bundle.js',
        path: path.resolve('view'),
    },
    mode: 'production',
    module: {
        rules: [{
            test: /\.js$/,
            exclude: /node_modules/,
        }, ],
    },
    resolve: {
        extensions: ['.js'],
    },
}