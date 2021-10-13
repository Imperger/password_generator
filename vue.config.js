/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('fs');

const IsProduction = () => process.env.NODE_ENV === 'production';

process.env.VUE_APP_BASE_URL = IsProduction()
  ? '/password_generator/'
  : '/';

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
  publicPath: process.env.VUE_APP_BASE_URL,
  devServer: devServerConfig()
};
