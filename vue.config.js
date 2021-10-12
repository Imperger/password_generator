/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('fs');

const IsProduction = () => process.env.NODE_ENV === 'production';

const devServerConfig = () => IsProduction()
  ? {}
  : {
    host: 'dev.lan',
    https: {
      key: fs.readFileSync('./dev/dev.key'),
      cert: fs.readFileSync('./dev/dev.cer')
    }
  };

module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/password_generator/'
    : '/',
  devServer: devServerConfig()
};
