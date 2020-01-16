const withImages = require('next-images');
const withSass = require('@zeit/next-sass');
const withCss = require('@zeit/next-css');

const path = require('path');

module.exports = withImages(withSass(withCss()));
