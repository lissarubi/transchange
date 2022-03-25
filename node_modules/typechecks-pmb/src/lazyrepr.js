/*jslint indent: 2, maxlen: 80, continue: false, unparam: false, node: true */
/* -*- tab-width: 2 -*- */
'use strict';


function lazyRepr(x) {
  var t = typeof x;
  try {
    x = String(x);
    if (x === t) { return x; }
    if (t === 'function') {
      return x.split(/\s*(\{|\))/).slice(0, 2).join('');
    }
    x = JSON.stringify(x);
  } catch (e) {
    x = '[cannot stringify: ' + e + ']';
  }
  return t + ' ' + x;
}


module.exports = lazyRepr;
