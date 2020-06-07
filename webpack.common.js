const path = require('path')
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/,
                loader: 'ts-loader',
                options: {
                    transpileOnly: true,
                    // getCustomTransformers: () => ({
                    //     before: [tsImportPluginFactory( /** options */)]
                    // }),
                },
                // use: [
                //     'babel-loader',
                //     'ts-loader',
                // ],
                exclude: /node_modules/,
            },
            {
                test: /\.(js|jsx)$/,
                use: 'babel-loader',
                exclude: /node_modules/,
            },
            {
                enforce: 'pre',
                test: /\.(ts|tsx)$/,
                include: [
                    path.resolve(__dirname, './example'),
                    path.resolve(__dirname, './src'),
                ],
                loader: 'eslint-loader',
                options: {
                    emitWarning: true,
                    formatter: require('eslint-friendly-formatter'),
                }
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test: /\.scss$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader',
                ]
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    {
                      loader: 'url-loader',
                    },
                  ],
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            useRelativePath: true,
                            // name: 'static/fonts/[name].[ext]'
                            name: 'assets/fonts/[name].[ext]'
                        }
                    }
                ]
            },
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
    ],
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx']
    },
    // output: {
    //     path: path.resolve(__dirname, 'dist'),
    //     filename: 'my-library.js',
    //     library: 'myLibrary',
    //     libraryTarget: 'umd',
    // }
}