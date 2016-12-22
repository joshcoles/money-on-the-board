const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const config = require('./webpack.config');

const port = process.env.port || 3000;

new WebpackDevServer(webpack(config), {
    publicPath: config.output.publicPath,
    watchOptions: {
      aggregateTimeout: 300,
      poll: 1000
    }
  })
  .listen(3000, '0.0.0.0', function (err, result) {
    if (err) {
      console.error(err);
    }
    console.log(`Client Connected. Running at ${port}`);
  });
