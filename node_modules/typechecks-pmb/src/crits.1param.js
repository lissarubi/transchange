/*jslint indent: 2, maxlen: 80, continue: false, unparam: false, node: true */
/* -*- tab-width: 2 -*- */
'use strict';

var EX, defMtd = require('./defmtd'), core = require('./crits.core');

/*jslint eqeq:true */
function weaklyEqual(a, b) { return (a == b); }
/*jslint eqeq:false */

EX = {};

defMtd.multi(EX, [
  ['weq', weaklyEqual],
  ['eeq', function strictlyEqual(a, b) { return (a === b); }],
  ['same', function exactlySame(a, b) {
    if (a === b) { return true; }
    if (core.nan(a)) { return core.nan(b); }
    return false;
  }],

  function lt(x, y) { return (x < y); },
  function gt(x, y) { return (x > y); },
  ['lte', function leq(x, y) { return (x <= y); }],
  ['gte', function geq(x, y) { return (x >= y); }],

  function oneOf(x, whitelist) {
    // use a set when you want to allow NaN!
    if (whitelist.has) { return whitelist.has(x); }
    return (whitelist.indexOf(x) >= 0);
  },

]);


module.exports = EX;
