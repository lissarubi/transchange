/*jslint indent: 2, maxlen: 80, continue: false, unparam: false, node: true */
/* -*- tab-width: 2 -*- */
'use strict';

function defMtd(dest, f) {
  var a;
  if (f.forEach) {
    a = f.slice(0, -1);
    f = f.slice(-1)[0];
  }
  if (!f.name) { throw new Error('Function must have a name'); }
  dest[f.name] = f;
  if (a) { a.forEach(function (n) { dest[n] = f; }); }
  return dest;
}

defMtd.multi = function (dest, spec) { return spec.reduce(defMtd, dest); };


module.exports = defMtd;
