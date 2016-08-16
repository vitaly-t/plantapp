var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.config');

var mongoose = require('mongoose');


new WebpackDevServer(webpack(config), {
  publicPath: config.output.publicPath,
  hot: true,
  historyApiFallback: true
}).listen(3000, 'localhost', function (err, result) {
  if (err) {
    console.log(err);
  }



// connect to Mongo when the app initializes
  mongoose.connect('mongodb://localhost/plantsdb', function (error) {
    if (error) {
      console.log(error);
    }
  });


// Enable api routes
  const api_routes = require('./api_routes');
  app.use('/api', api_routes);




  console.log('Listening at localhost:3000');
});
