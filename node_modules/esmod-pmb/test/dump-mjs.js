/*jslint indent: 2, maxlen: 80, node: true */
/* -*- tab-width: 2 -*- */
'use strict';
var jsmRqr = require('esmod-pmb')(module, { reexport: false });
process.argv.slice(2).forEach(function (arg, mod) {
  if (!arg) { return; }
  if (arg === '--') { return; }
  try {
    mod = jsmRqr(arg);
    console.log(arg, Object.assign({ '__orig__': mod }, mod));
  } catch (err) {
    console.error(arg, err);
  }
});
