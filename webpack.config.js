const { resolve } = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');

const isProduction = process.argv.indexOf('--production') >= 0;

const webpackConfig = () => {
    let options = {
        entry: {
            cssSlider: './src/cssSlider.js',
            cssSliderStyles: './src/cssSlider.scss'
        },
        output: {
            library: 'CssSlider',
            libraryTarget: 'umd',
            libraryExport: 'default',
            path: resolve('./dist'),
            filename: `[name].js`
        },
        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                },
                {
                    test: /\.(css|scss)$/,
                    use: [
                        'style-loader',
                        MiniCssExtractPlugin.loader,
                        {
                            loader: 'css-loader',
                            options: {
                                sourceMap: !isProduction
                            }
                        },
                        {
                            loader: 'postcss-loader',
                            options: {
                                ident: 'postcss',
                                sourceMap: !isProduction,
                                plugins: (loader) => [
                                    require('autoprefixer')()
                                ]
                            }
                        },
                        {
                            loader: 'sass-loader',
                            options: {
                                sourceMap: !isProduction,
                                outputStyle: isProduction ? 'compressed' : 'expanded'
                            }
                        }
                    ]
                }
            ]
        },
        plugins: [
            new MiniCssExtractPlugin({
                filename: `[name].css`
            })
        ]
    };

    if (!isProduction) {
        options = Object.assign(options, {
            mode: 'development',
            devtool: 'source-map'
        });
    }

    if (isProduction) {
        options = Object.assign(options, {
            mode: 'production',
            optimization: {
                minimizer: [new TerserPlugin()]
            }
        });
    }

    return options;
};

module.exports = webpackConfig;
