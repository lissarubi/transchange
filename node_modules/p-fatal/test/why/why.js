/*jslint indent: 2, maxlen: 80, continue: false, unparam: false, node: true */
/* -*- tab-width: 2 -*- */
'use strict';

if (process.env.REQUIRE_EARLY) { require(process.env.REQUIRE_EARLY); }

var Promise = require('bluebird'),
  errorWatchdog = require('./configurable-error-logger.js');

if (process.env.REQUIRE_LATE) { require(process.env.REQUIRE_LATE); }

errorWatchdog.install({
  errorLogTarget: (process.env.appcfg_errlog || 'default.error.log'),
});

Promise.try(function failWhale() {
  throw new Error('Fail whale failed. :-(');
});
