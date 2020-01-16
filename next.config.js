const withImages = require('next-images');
const path = require('path');

module.exports = withImages({
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
});
