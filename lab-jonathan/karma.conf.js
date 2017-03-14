const webpack= require('./webpack.config.js');
webpack.entry = {};

module.exports = function(config) {
  config.set({
    webpack,
    port: 9876,
    colors: true,
    basePath: '',
    autoWatch: true,
    singleRun: false,
    concurrency: Infinity,
    frameworks: ['jasmine'],
    reporters: ['mocha'],
    browsers: ['Chrome'],
    logLevel: config.LOG_INFO,
    preprocessors: {
      'app/entry.js': ['webpack'],
      'test/**/*-test.js': ['webpack'],
    },
    files: [
      'app/entry.js',
      'test/**/*-test.js',
      'node_modules/angular-mocks/angular-mocks.js',
    ],
  });
};
