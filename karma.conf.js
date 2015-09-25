'use strict';
/* jshint node:true */

module.exports = function(config) {
  config.set({
    frameworks: [
      'mocha',
    ],
    files: [
      'node_modules/chai/chai.js',
      'deling.js',
      'test/spec.js',
    ],
    reporters: ['mocha'],
    plugins: [
      'karma-phantomjs-launcher',
      'karma-mocha',
      'karma-mocha-reporter'
    ],
    colors: true,
    singleRun: true,
    autoWatch: true,
    browsers: [
      'PhantomJS'
    ],
  });
};
