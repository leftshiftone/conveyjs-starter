const withImages = require('next-images');
const withSass = require('@zeit/next-sass');
const withCss = require('@zeit/next-css');

module.exports = withImages(withSass(withCss(
    {
        transform: {
            '^.+\\.tsx?$': 'ts-jest'
        }
    }
)));
