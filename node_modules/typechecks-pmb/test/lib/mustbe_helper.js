/*jslint indent: 2, maxlen: 80, node: true */
/* -*- tab-width: 2 -*- */
'use strict';

var EX, mustBe = require('typechecks-pmb/must-be'), test,
  is = require('typechecks-pmb'),
  eq = require('equal-pmb');


EX = function makeMustbeTest(crit, crExpl) {
  var ck = mustBe(crit, 'input'),
    err = 'AssertionError: input must be ' + (crExpl || crit) + " but isn't ";
  return function verify(spec) {
    var why = spec.isNot, x;
    if (why) {
      x = spec.nope;
      return eq.err(function () { ck(x); }, err + why + ': ' + is.lazyRepr(x));
    }
    x = spec.ok;
    return eq(ck(x), x);
  };
};


module.exports = EX;
