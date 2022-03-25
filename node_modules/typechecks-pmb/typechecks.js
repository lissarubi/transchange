/*jslint indent: 2, maxlen: 80, continue: false, unparam: false, node: true */
/* -*- tab-width: 2 -*- */
'use strict';

var is, defMtd = require('./src/defmtd'),
  coreCrit = require('./src/crits.core'),
  derivCrit = require('./src/crits.deriv'),
  oneParamCrit = require('./src/crits.1param'),
  getOwn = require('getown'),
  q = require('./src/lazyrepr');

function makeIsWithArgs(args) {
  if (!args.shift) { return; }
  var crit = args[0], impl;
  if (!is.str(crit)) { throw new Error('Criterion name must be a string'); }
  impl = is(crit);
  args = args.slice(1);
  function chk(x) { return impl.apply(null, [x].concat(args)); }
  chk.descr = crit;
  return chk;
}

is = function is(crit) {
  if (!crit) { throw new Error('No criterion given'); }
  var f = is.ifFunc(makeIsWithArgs(crit) || getOwn(is, crit));
  if (!f) { throw new Error('Unsupported criterion: ' + crit); }
  return f;
};
Object.assign(is,
  coreCrit,
  derivCrit,
  oneParamCrit,
  { lazyRepr: q });

is.ifFunc = function (f, d, t) { return (is.fun(f) ? (t || f) : d); };
is.ifObj = function (o, d, t) { return (is.obj(o) ? (t || o) : d); };

is.undef = function (x, then) {
  if (x === undefined) {
    if (arguments.length > 1) { return then; }
    return true;
  }
  if (arguments.length > 1) { return x; }
  return false;
};

is.numInRange = function (x, a, b) {
  return ((x === +x) && (x >= a) && (x <= b));
};









module.exports = is;
