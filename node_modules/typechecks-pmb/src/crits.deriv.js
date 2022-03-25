/*jslint indent: 2, maxlen: 80, continue: false, unparam: false, node: true */
/* -*- tab-width: 2 -*- */
'use strict';

var EX, defMtd = require('./defmtd');

function measure(x) {
  if (!x) { return 0; }
  var len = x.length;
  if (len === undefined) { return Object.keys(x).length; }
  return len;
}

EX = {};

defMtd.multi(EX, [

  function empty(x) { return (measure(x) === 0); },

  function nonEmpty(x) {
    var n = measure(x);
    return (Number.isFinite(n) && (n > 0));
  },

  function minLength(x, m) { return (measure(x) >= m); },
  function maxLength(x, m) { return (measure(x) <= m); },
  function ofLength(x, l) { return (measure(x) === l); },

]);


module.exports = EX;
