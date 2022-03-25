/*jslint indent: 2, maxlen: 80, continue: false, unparam: false, node: true */
/* -*- tab-width: 2 -*- */
'use strict';

require('p-fatal');
var Promise = require('bluebird'), stockNonErrors,
  nonError = process.env.NON_ERR,
  hasOwn = Function.call.bind(Object.prototype.hasOwnProperty);

stockNonErrors = {
  'undef': undefined,
  '0bj': Object.create(null),
};
nonError = (hasOwn(stockNonErrors, nonError)
  ? stockNonErrors[nonError]
  : JSON.parse(nonError));

Promise.try(function () { throw nonError; });
