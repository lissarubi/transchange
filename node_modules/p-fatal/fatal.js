/*jslint indent: 2, maxlen: 80, continue: false, unparam: false, node: true */
/* -*- tab-width: 2 -*- */
'use strict';

function pfatal(e, p) {
  e = pfatal.ensureTruthy(e);
  try {
    e.promise = p;
  } catch (ignore) {
    // We tried. Propagating this error would mask the original one,
    // which is probably more important.
  }
  pfatal.addCauseStack(e);
  setImmediate(function rethrowNow() { throw e; });
}


pfatal.ensureTruthy = function (e) {
  if (e) { return e; }
  var o = e;
  try {
    e = '"' + String(e) + '"';
  } catch (c) {
    e = 'something that cannot even be stringified.';
  }
  e = new Error('unhandledRejection is not an object: ' + e);
  e.origFalseyError = o;
  return e;
};


pfatal.addCauseStack = function (e) {
  var c = e, s;
  while (c) {
    c = (c.jse_cause || c.cause || false);
    s = (c.stack || s);
  }
  if (!s) { return; }
  e.stack = (String(e.stack).replace(/\s+$/, '')
    + '\n----- original .cause stack -----\n' + s);
};


process.on('unhandledRejection', pfatal);

module.exports = pfatal;
