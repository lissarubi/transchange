/*jslint indent: 2, maxlen: 80, continue: false, unparam: false, node: true */
/* -*- tab-width: 2 -*- */
'use strict';

var EX = { cnt: 0 };

EX.install = function install(opts) {
  if (!opts) { return; }
  var dest = opts.errorLogTarget;
  if (!dest) { return; }
  function logError(err) {
    console.warn('pretend to log error to ' + dest + ':', String(err));
    EX.cnt += 1;
  }
  process.on('unhandledRejection', logError);
};

function displayStats() {
  console.log('configurable-error-logger logged', EX.cnt, 'errors.');
}
process.once('exit', displayStats);

module.exports = EX;
