const withImages = require('next-images');
const withSass = require('@zeit/next-sass');
const withCss = require('@zeit/next-css');

const path = require('path');

module.exports = withImages(withSass(withCss(/*{
    cssModules: false,
    webpack: (config) => {
        config.module.rules.push(
            {
                test: /\.css$/,
                use: [
                    {
                        loader: 'emit-file-loader',
                        options: {
                            name: 'dist/[path][name].[ext].js',
                        },
                    },
                    {
                        loader: 'babel-loader',
                        options: {
                            babelrc: false,
                            extends: path.resolve(__dirname, './.babelrc'),
                        },
                    },
                    'styled-jsx-css-loader',
                ],
            }
        );

        return config;
    }
}*/)));
